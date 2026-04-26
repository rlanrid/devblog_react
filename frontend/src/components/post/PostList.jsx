import PostItem from './PostItem'
import Loading from '../common/Loading';

const PostList = ({ postList, loading, lastRef }) => {
  const isEmpty = !postList || postList.length === 0;

  if (loading && isEmpty) return <Loading />;

  return (
    <>
      {!isEmpty ?
        <>
          <div className="post__list">
            {
              postList.map((post) => {
                return <PostItem key={post._id} post={post} />
              })
            }
          </div>

          <div ref={lastRef} style={{ height: 1 }} />

          {loading && <Loading />}
        </>
        :
        <p className='post__none'>게시글이 없습니다.</p>
      }
    </>
  )
}

export default PostList