import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { corebase } from '../../corebase/client';


function App() {
  const [blogs, setBlogs] = useState<{ title: string; content: string; category: string }[]>([]); 
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await corebase.from('blog').select('*');
      if (error) {
        console.error('Error fetching blogs data:', error);
      } else if (data) {
        setBlogs(data);
      }
    };
    fetchBlog();
  }, []);

  const handleSubmit = async () => {
    const { data, error } = await corebase.from('blog').insert([
      { title, content, category },
    ]);
    if (error) {
      console.error('Error creating blog:', error);
    } else {
      console.log('Blog created:', data);
      setTitle('');
      setContent('');
      setCategory('');
      setBlogs(prev => [...prev,{title,content,category}]);
    }
  };

  return (
    <div className='bg-[#F8FAFC] min-h-screen'>
      <div className='text-center p-4 mt-4'>
        <h1 className='text-4xl font-semibold'>
          Create New{' '}
          <span className='bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text'>
            Blog
          </span>{' '}
          Post.
        </h1>
        <h2 className='text-2xl text-gray-700 mt-2'>
          Share your sweetest creations with the world
        </h2>
      </div>

      <div className='flex flex-col justify-center text-center gap-4 mt-6'>
        <Input
          name='title'
          placeholder='Enter blog title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          name='content'
          placeholder='Enter blog content'
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          name='category'
          placeholder='Category'
          type='text'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className='flex justify-center mt-4 p-4'>
        <Button title='Submit' onClick={handleSubmit} />
      </div>

      <div className='mt-8 p-4'>
        {blogs.map((blog) => (
          <div className='border p-4 mb-4 rounded-md'>
            <h3 className='text-xl font-semibold text-blue-600 '>{blog.title}</h3>
            <p>{blog.content}</p>
            <span className='text-gray-500'>{blog.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
