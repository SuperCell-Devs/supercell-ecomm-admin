import React from 'react'


interface ILoadingButtonProps {
  loading: boolean;
  title: string;
  type: 'submit' | 'button'
}
const LoadingButton = (props: ILoadingButtonProps) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button type={props.type}
        className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
        {props.loading ? "..." : props.title}
      </button>
    </div>
  )
}

export default LoadingButton