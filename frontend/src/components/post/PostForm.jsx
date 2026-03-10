import { MDXEditor, toolbarPlugin, headingsPlugin, listsPlugin, quotePlugin, markdownShortcutPlugin, UndoRedo, BoldItalicUnderlineToggles, InsertImage, imagePlugin } from '@mdxeditor/editor';
import { useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';

const PostForm = ({ form, setForm, handleFieldChange, handleCreate }) => {

  const [tags, setTags] = useState([]);

  const handleContentChange = (markdown) => {
    setForm(prev => ({
      ...prev,
      content: markdown
    }));
  };

  // async function imageUploadHandler(image) {
  //   const formData = new FormData()
  //   formData.append('image', image)
  //   // send the file to your server and return
  //   // the URL of the uploaded image in the response
  //   const response = await fetch('/uploads/new', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   const json = (await response.json());
  //   return json.url
  // }

  return (
    <form onSubmit={handleCreate} className='post-create__form'>
      <textarea
        name="title"
        className="post-create__title"
        rows={1}
        placeholder="제목을 입력하세요."
        value={form.title}
        onChange={handleFieldChange}
      />

      <div className="post-create__tagBox">
        <ul className="post-create__tags">
          {tags.map((tag) => (
            <li key={tag} className="post-create__tag">
              <Link to={`/posts/tag=${tag}`}>
                # {tag}
              </Link>
            </li>
          ))}
        </ul>

        <input
          name="tags"
          placeholder="태그를 입력한 뒤 Enter 키를 누르세요."
          value={form.tags}
          onChange={handleFieldChange}
        />
      </div>

      <MDXEditor
        markdown={form.content}
        onChange={handleContentChange}
        placeholder="당신의 이야기를 적어보세요..."
        className='post-create__content'
        contentEditableClassName='post-create__editorContent'
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertImage />
              </>
            )
          }),
          // imagePlugin({ imageUploadHandler }),
        ]}
      />

      <div className="post-create__bottom">
        <Link to='/'>
          <HiArrowNarrowLeft />
          <span>나가기</span>
        </Link>
        <button type='submit' className='post-create__publish'>작성</button>
      </div>
    </form>
  )
}

export default PostForm