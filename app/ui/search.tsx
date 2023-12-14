'use client'; //客戶端元件，可以使用事件監聽器和掛鉤。

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    // console.log(term); //測試監聽事件
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); //當使用者輸入新的搜尋查詢時，希望將頁碼重設為 1
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    // ${pathname}是當前路徑，在您的情況下，"/dashboard/invoices" 
    //當使用者在搜尋欄中鍵入內容時，params.toString()會將輸入內容轉換為 URL 友善的格式。
    //使用使用者的搜尋資料更新 URL。例如，使用者搜尋“Lee”，/dashboard/invoices?query=lee。
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        //確保輸入欄位與 URL 同步並在共用時填充
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
