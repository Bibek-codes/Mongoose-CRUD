const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:String,
    author:String,
    category:String,
});
// const [data,setData]=useState();
// const x=await   
// setData(x); 
// {data.map((t)=>{
//     return (<div>
//          <p>{t.}</p>
//     </div>)
// })}
module.exports = mongoose.model('Book',bookSchema);