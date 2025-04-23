import React from 'react';
export default function Card() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img className="p-8 rounded-t-lg" src="https://c4.wallpaperflare.com/wallpaper/204/345/189/kamen-rider-ooo-wallpaper-preview.jpg" alt="product_image1" />
            </a>
            <div className="px-5 pb-5">
                
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    I shall decide... how the story will end!
                    </h5>
              <p className='text-end font-semibold tracking-tight text-gray-900 dark:text-white'>~ Kamen Rider Saber</p>
               
            </div>
        </div>
    );
}
