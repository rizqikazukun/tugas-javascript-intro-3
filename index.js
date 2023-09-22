// answer 1

const cekHariKerja = (day) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const dataDay = ['senin','selasa','rabu','kamis','jumat']
            const cek = dataDay.find((item)=>{
                return item === day
            })
            if (cek) {
                resolve(cek)
            }
            else {
                reject(new Error('Ini Bukan Hari Kerja'))
            }
        },1000)
    })
}

const isWorkingDay = cekHariKerja('sabtu')
isWorkingDay.then(result => console.log(result)).catch(error => console.log(error.message))

// answer 2

const getMonth = (callback) => {
    setTimeout(()=>{
        let error =  false
        let month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        if (!error) {
            callback(null, month)
        } else {
            callback(new Error('Sorry Data Not Found'), [])
        }
    },1000)
}

getMonth(( error, data )=>{
    if (error) {
        console.log(error.message)
    } else {
        data.map(data => console.log(data))
    }
})

// answer 3

// App1
const Ticketing = {
    currentBalance: 0,
    topup: function (money) {
        return new Promise((resolve,reject)=>{
            const minToup = 10000
            if (!(money < minToup)) {
                this.currentBalance += minToup
                resolve(
                    `Current balance is Rp.${this.currentBalance}`
                )
            } else {
                reject(
                    new Error(`Sorry Payment is reject, Minimum TopUp is ${minToup}`)
                )
            }
        })
    },
    useTicket: function () {
        return new Promise((resolve,reject)=>{
            const entryPrice = 3500
            if (!(this.currentBalance < entryPrice)) {
                this.currentBalance -= entryPrice
                resolve(`The ticket price is ${entryPrice}. Your current balance is Rp.${this.currentBalance}. Thankyou Enjoy The trip.`)
            } else {
                reject(new Error(`Sorry balance is not enough, Please topup first, Your current balance is Rp.${this.currentBalance}`))
            }

        })
    }
}

// App2
const NoteApp = {
    notesData: [],
    addNotes: function (param) {
        return new Promise((resolve,reject)=>{

            if (!param) {
                reject(new Error(`E4000 : Can't add an empty title and content Note`))
            }

            let { title, content } = param
            const timeStamp = new Date()
            const id = !this.notesData ? 1:this.notesData.length+1
            const note = {id, title, content, timeStamp}

            if (!title && !content) {
                reject(new Error(`E4000 : Can't add an empty title and content Note`))
            } else if (!title) {
                title = content.substr(0, 20)
                this.notesData.push({...note, title})
                resolve(`Note Added with error E2401`)
            } else if (!content) {
                content = ''
                this.notesData.push({...note, content})
                resolve(`Note Added with error E2402`)
            } else {
                this.notesData.push(note)
                resolve(`Note Added`)
            }
        })
    },
    readNotes: function () {
        return new Promise((resolve,reject)=>{
            if (this.notesData.length == 0){
                reject(new Error('E4400 : Notes Not Found'))
            } else {
                resolve(this.notesData)
            }
        })
    }
}

const runApp = async () => {

    const busTicket = Ticketing
    await busTicket.useTicket().then(msg => console.log(msg)).catch(err => console.log(err.message))
    await busTicket.topup(7500).then(msg => console.log(msg)).catch(err => console.log(err.message))
    await busTicket.topup(10000).then(msg => console.log(msg)).catch(err => console.log(err.message))
    await busTicket.useTicket().then(msg => console.log(msg)).catch(err => console.log(err.message))

    const myNote = NoteApp
    await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
    await myNote.addNotes().then(msg => console.log(msg)).catch(err => console.log(err.message))
    await myNote.addNotes({title: 'Todo Hari Ini'}).then(msg => console.log(msg)).catch(err => console.log(err.message))
    await myNote.addNotes({content: 'Todo besok mancing di empang pak basuki'}).then(msg => console.log(msg)).catch(err => console.log(err.message))
    await myNote.addNotes({title: 'Todo Minggu Ini', content: 'Belum Ada'}).then(msg => console.log(msg)).catch(err => console.log(err.message))
    await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
}
runApp()

// answer 4

const getNames = async () => {
   try {
    const fetchPerson = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await fetchPerson.json()
    
    const names = []
    data.map(person => {
        const {name} = person
        names.push({name})
    })

    console.log(names)
    
   } catch (error) {
    console.log(error.message)
   }
}

getNames()