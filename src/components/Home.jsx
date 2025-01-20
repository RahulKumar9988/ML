import { useState } from 'react'
function Home() {
    const [power,setPower]=useState("");
    const [current,setCurrent]=useState("")
    const [temperature,setTemperature]=useState("");
    const [answer,setAnswer]=useState("")

  return (
    <div className=' flex text-white w-full h-40 justify-center items-center sticky'>
        <p className='text-6xl'>Motor fault <br /><span className='text-green-600'>Detector</span></p>
        <div className='flex-col text-black ml-14'>
        <input className='gap-10 w-2/3 h-16 rounded-md text-center' type="text" onChange={(e)=>{
        setPower(e.target.value)
    }}/>
        <br />
        <input className='gap-10 mt-6 w-2/3 h-16 rounded-md text-center' type="text"  onChange={(e)=>{
        setCurrent(e.target.value)}}/>
        <br />
        <input className='gap-10 mt-6 w-2/3 h-16 rounded-md text-center' type="text" onChange={(e)=>{
        setTemperature(e.target.value)
    }}/>

</div>
        <button className='bg-green-600 w-1/6 h-16 rounded-md mr-12' type="button" onClick={ async()=>{
                var fb=new FormData()
            fb.append("power",power)
            fb.append("current",current)
            fb.append("temperature",temperature)
            var resp=await fetch("/pred/",{
                method:'POST',
                body:fb
            })
            var data=await resp.json()
            console.log(data)
            setAnswer(data)
        }}>predict</button>
         
         {answer?<div><h1 className='text-red-700 text-3xl font-bold text-wrap'> Fault found</h1></div>:<div><h1 className='text-green-700 text-3xl font-bold text-wrap'>fault not found</h1></div>}
        
       </div>
  )
}

export default Home