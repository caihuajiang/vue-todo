 <template>
 	<section class="real-app">
 		<input type="text" 
 		       class="add-input"
 		       autofocus="autofocus"
 		       placeholder="接下去要做什么？"
 		       @keyup.enter="addToDo"/>
 		<Item v-bind:todo="todo"
              v-for="todo in filteredTodos"
              v-bind:key="todo.id"
              @del="deleteTodo"
              ></Item>
              <!-- 父组件监听到del事件触发时执行deleteTodo-->
        <Tabs v-bind:filter="filter"
              v-bind:todos="todos"
              v-on:toggle="toggleFilter"
              v-on:clearAll="clearAllCompleted"></Tabs>
 	</section>
 </template>
 <script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    let id=0;
 	export default{

 		data(){
 			return{
 				todos:[],
                filter:'all'
 			}
 		},
        computed:{
               filteredTodos(){
                   if (this.filter === 'all') {
                     return this.todos;
                   }

                   const completed = this.filter === 'completed';
                   return this.todos.filter(todo => completed === todo.completed)
               }
        },
 		components:{
 			Item,
            Tabs
 		},
 		methods:{
 			addToDo(e){
               this.todos.unshift({
                 id:id++,
                 content:e.target.value.trim(),
                 completed:false
               })
               e.target.value=''
 			},           
            deleteTodo(id){
                //this.findIndex()传入一个测试条件（函数），返回符合条件的数组的第一个元素的位置
                this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1)
            },
            toggleFilter(state){
                this.filter=state;
                console.log(this.filter)
            },
            clearAllCompleted(){
                this.todos = this.todos.filter(todo => todo.completed === false)
            }
 		}
        
        
 	}
 </script>
 <style lang="stylus" scoped>
 	 .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
 </style>