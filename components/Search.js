'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`/?${params.toString()}`);
    document.querySelector('input[name="search"]').value = '';
  }, 1000);

  return (
    <div className='form-control'>
      <input
        name='search'
        type='text'
        placeholder='Search event...'
        onChange={e => handleSearch(e.target.value)}
        className='input input-bordered w-full'
      />
    </div>
  );
}
