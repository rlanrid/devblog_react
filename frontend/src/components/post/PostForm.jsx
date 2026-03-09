import { MDXEditor, toolbarPlugin, headingsPlugin, listsPlugin, quotePlugin, markdownShortcutPlugin, UndoRedo, BoldItalicUnderlineToggles } from '@mdxeditor/editor';

const PostForm = ({ form, setForm, handleFieldChange, handleCreate }) => {
  const handleContentChange = (markdown) => {
    setForm(prev => ({
      ...prev,
      content: markdown
    }));
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        name="title"
        className="post-create__title"
        placeholder="제목을 입력하세요."
        value={form.title}
        onChange={handleFieldChange}
      />

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
              </>
            )
          })
        ]}
      />

      <input
        name="tags"
        className='post-create__tags'
        placeholder="태그"
        value={form.tags}
        onChange={handleFieldChange}
      />

      <button type='submit'>작성</button>
    </form>
  )
}

export default PostForm