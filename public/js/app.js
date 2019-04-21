

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    search(searchInput.value)
  
})

function search(address){
    message2.textContent = ''
    message1.textContent = 'loading ... '
    fetch('http://localhost:3000/weather?address='+address).then((res)=>{
        res.json().then(({error,location,forcastData:{summary}={}} = {})=>{
           
            if(error){
                message1.textContent = error
            }else{
                message1.textContent = location
                message2.textContent = summary

            }
        })
    })
    
}


