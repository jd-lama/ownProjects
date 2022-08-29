const clients = [
	{
		id:'1',
		name:'jd lama',
		email:"yakutamang1@gmail.com",
		phone:"974456446456"
	},
	{
		id:'2',
		name:'sara tamang',
		email:"sara123@gmail.com",
		phone:"974456446456"
	},
]

const projects = [
	{
		id:'1',
		name:"jd lama",
		description:"hello",
		status:"not started",
		client:{
			id:"1"
		}
	}
]

module.exports = {clients,projects}