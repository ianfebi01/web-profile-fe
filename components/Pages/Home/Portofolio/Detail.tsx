'use client'
import { useGetDetail } from '@/lib/hooks/api/portofolio'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { sanitize } from 'isomorphic-dompurify'
import Image from 'next/image'
import SkeletonDetail from './SkeletonDetail'
import Chip from '@/components/Chip'
interface Props {
  id: string | number
}
const Detail = ( { id }: Props ) => {
  const { data, isFetching } = useGetDetail( id )
  const { year } = useFormatDate()

  return (
    <section
      id="portofolio"
      className="main__section bg-dark-secondary grow-[1]"
    >
      {isFetching && !data?.data ? (
        <SkeletonDetail />
      ) : (
        <div className="article__container mt-20 sm:mt-20 mb-8 flex flex-col gap-4">
          <div className="my-4">
            {data?.data?.year !== undefined && (
              <Chip label={year( data?.data?.year )}
                bg="dark"
              />
            )}
            <h1 className="text-5xl font-bold">{data?.data?.name}</h1>
          </div>
          {data?.data?.image !== undefined && (
            <div className="relative aspect-video  overflow-hidden">
              <Image
                alt={`Image ${data?.data?.name}`}
                src={data?.data?.image}
                fill
                style={{
                  objectFit : 'contain',
                }}
                sizes="auto"
              />
            </div>
          )}
          {data?.data?.description !== undefined && (
            <div
              className="mt-4 text-white/90"
              dangerouslySetInnerHTML={{
                __html : sanitize( data?.data?.description ),
              }}
            ></div>
          )}
        </div>
      )}
    </section>
  )
}

export default Detail
