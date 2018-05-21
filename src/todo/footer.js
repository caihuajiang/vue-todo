import '../assets/styles/footer.styl'
export default{
	data(){
		return{
		   author:'xiaobin'
		}
		
	},
	render(){
       return(
          <div id="footer">Written by {this.author}</div>
       )
    }
}
