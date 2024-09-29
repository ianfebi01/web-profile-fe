'use client'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination } from '@/types/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useMemo, useState } from 'react'
import SearchInput from '../Inputs/SearchInput'
import StyledPagination from '../Layouts/StyledPagination'
import NoDataFound from '../NoDataFound'
import Button2 from '../Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { IApiPortofolio } from '@/types/api/portofolio'
import { usePathname, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Modal from '../Modal/Modal'
import DataTable, { IColumn } from '../DataTable'
import { format } from 'date-fns'
import { useRouter } from 'nextjs-toploader/app'

const Portofolio = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const q = searchParams.get('q') || ''

  const axiosAuth = useAxiosAuth()

  const { data, refetch, isFetching } = useQuery<
    IApi<IApiPortofolio[]> & IApiPagination
  >({
    queryKey: ['portofolio', page, q],
    queryFn: async () => {
      const data: AxiosResponse<IApi<IApiPortofolio[]> & IApiPagination> =
        await axiosAuth.get('/v1/portofolio', {
          params: {
            page: page || 1,
            limit: limit || 12,
            q: q || '',
          },
        })

      return data?.data
    },
  })

  const handlePageChange = (page: number) => {
    const selectedPage = page + 1

    setSearchParams('page', selectedPage.toString())
  }

  // @ NOTE router

  const goToAdd = () => {
    const queryParams = new URLSearchParams(searchParams.toString())

    router.push('/admin/portofolio/add' + '?' + queryParams.toString())
  }

  const goToEdit = (id: number) => {
    const queryParams = new URLSearchParams(searchParams.toString())

    router.push(
      '/admin/portofolio/edit/' + id.toString() + '?' + queryParams.toString()
    )
  }

  const setSearchParams = (key: string, val: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    // update as necessary
    const value = val.trim()

    if (!value) {
      current.delete(key)
    } else {
      current.set(key, val)
    }

    // cast to string
    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  // @ NOTE fake look
  const mockLoop = new Array(limit).fill(0)

  // color
  const getColor = (index: number) => {
    const num = index + 1

    if (num % 4 === 0) return 'bg-dark-secondary'
    else if (num % 3 === 0) return 'bg-green'
    else if (num % 2 === 0) return 'bg-white'
    else return 'bg-dark-secondary'
  }

  // @ NOTE handle delete
  const [deleteWarningAlert, setDeleteWarningAlert] = useState<boolean>(false)
  const [id, setId] = useState<number | null>(null)
  // const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['skill', 'delete'],
    mutationFn: async (id: number) => {
      const data: AxiosResponse<IApi<IApiPortofolio> & IApiPagination> =
        await axiosAuth.delete(`/v1/portofolio/${id}`)

      return data.data.data
    },
    onSuccess: () => {
      // queryClient.invalidateQueries( {
      // 	queryKey : ['portofolio', page, q],
      // } )
      refetch()
      toast.success('Successfully delete portofolio!')
      setDeleteWarningAlert(false)
    },
    onError: (error: AxiosError<IApi>) => {
      toast.error(error.response?.data?.message as string)
    },
  })

  const handleDelete = (id: number) => {
    setId(id)
    setDeleteWarningAlert(true)
  }

  const onDeleteOk = () => {
    if (id) mutate(id)
  }

  /**
   *  Table
   */

  const COLUMNS: IColumn<IApiPortofolio>[] = useMemo(
    () => [
      {
        label: 'ID',
        renderCell: (item: IApiPortofolio) => item.id,
        size: '40px',
      },
      { label: 'Name', renderCell: (item: IApiPortofolio) => item.name },
      {
        label: 'Year',
        renderCell: (item: IApiPortofolio) =>
          String(format(new Date(item.year), 'yyyy')),
      },
      {
        label: 'Skills',
        renderCell: (item: IApiPortofolio) =>
          item.skills?.map((skill) => skill.name),
      },
      {
        label: 'Action',
        size: '96px',
        renderCell: (item: IApiPortofolio) => (
          <div className="flex items-center gap-2">
            <Button2
              variant="icon"
              disabled={isFetching}
              onClick={() => goToEdit(item.id)}
            >
              <FontAwesomeIcon icon={faPen} size="sm" />
            </Button2>
            <Button2
              variant="icon"
              disabled={isFetching}
              onClick={() => handleDelete(item.id)}
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </Button2>
          </div>
        ),
      },
    ],
    [isFetching]
  )

  return (
    <>
      <div className="flex flex-col gap-8 h-full">
        <div className="flex gap-4 justify-between">
          <SearchInput
            placeholder="Search portofolio"
            type="text"
            value={(q as string) || ''}
            setValue={(value: string) => setSearchParams('q', value)}
          />

          <Button2
            type="button"
            className="gap-2 flex"
            onClick={() => goToAdd()}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Portofolio
          </Button2>
        </div>
        <DataTable columns={COLUMNS} datas={data?.data} loading={isFetching} />

        {/* Pagination */}
        {data && data?.data?.length && !isFetching ? (
          <StyledPagination
            setCurrentPage={handlePageChange}
            currentPage={page}
            totalPages={data?.totalPage as number}
            hasNextPage={data?.hasNextPage as boolean}
          />
        ) : (
          ''
        )}
      </div>
      <Modal
        isOpen={deleteWarningAlert}
        setIsOpen={setDeleteWarningAlert}
        onConfirm={() => onDeleteOk()}
        onCancel={() => setDeleteWarningAlert(false)}
        variant="warning"
        title="Are you sure?"
        desciption="Are you sure want to delete portofolio?"
        confirmText="Confirm"
        loading={isPending}
      ></Modal>
    </>
  )
}

export default Portofolio
