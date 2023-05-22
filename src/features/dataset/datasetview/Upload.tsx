
import Button from '@components/Buttons'

export default function UploadTab () {
  return (<div className=' h-full w-full'>
    <div className='font-bold py-2 flex justify-between '>
    <span>Managing Datasets</span>
    <Button>Add Classes</Button>
    </div>
        <div className=' h-full  container grid grid-cols-12 grid-rows-6 gap-5'>
            <div className=' col-span-4 row-span-2 border flex justify-center items-center shadow'>標記比例:50%+是否可開始訓練</div>
            <div className=' col-span-4 row-span-2 border flex justify-center items-center'>100張總張數+50張已標記</div>
            <div className=' col-span-4 row-span-2 border flex justify-center items-center'>佔用空間大小, 30G</div>
            <div className=' col-span-4 row-span-2 border flex justify-center items-center'>這個dataset包含幾種class</div>
            <div className=' col-span-8 row-span-2 border flex justify-center items-center'>長條圖+統計各種class有幾隻</div>
        </div>
    </div>)
}
