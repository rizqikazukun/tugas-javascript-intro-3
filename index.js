// answer 1

const cekHariKerja = (day) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat']
      const cek = dataDay.find((item) => {
        return item === day
      })
      if (cek) {
        resolve(cek)
      } else {
        reject(new Error('Ini Bukan Hari Kerja'))
      }
    }, 1000)
  })
}

const isWorkingDay = cekHariKerja('sabtu')
isWorkingDay.then(result => console.log(result)).catch(error => console.log(error.message))

// answer 2

const getMonth = (callback) => {
  setTimeout(() => {
    const error = false
    const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    if (!error) {
      callback(null, month)
    } else {
      callback(new Error('Sorry Data Not Found'), [])
    }
  }, 1000)
}

getMonth((error, data) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      if (!param) {
        reject(new Error('E4001 : No param sent'))
      }

      let { title, content } = param
      const createdAt = new Date()
      const id = !this.notesData ? 1 : this.notesData.length + 1
      const note = { id, title, content, createdAt, updateAt: null }

      if (!title && !content) {
        reject(new Error('E4003 : Can\'t add an empty title and content Note'))
      } else if (!title) {
        title = content.substr(0, 20)
        this.notesData.push({ ...note, title })
        resolve('Note Added with error E2401')
      } else if (!content) {
        content = ''
        this.notesData.push({ ...note, content })
        resolve('Note Added with error E2402')
      } else {
        this.notesData.push(note)
        resolve('Note Added')
      }
    })
  },
  readNotes: function () {
    return new Promise((resolve, reject) => {
      if (this.notesData.length === 0) {
        reject(new Error('E4400 : Notes Not Found'))
      } else {
        resolve(this.notesData)
      }
    })
  },
  updateNotes: function (param) {
    return new Promise((resolve, reject) => {
      if (!param) {
        reject(new Error('E4001 : No param sent'))
      }

      let { id, title, content } = param
      const updateAt = new Date()

      const noteIndex = this.notesData.findIndex(item => {
        const isHasProperty = Object.getOwnPropertyDescriptors(item)
        return isHasProperty.id.value === id
      })

      // Known Bug : if this if valued as true, the error is able to catch but the program is not stop
      //             and keep the prosses.
      //             console.log(noteIndex == -1)
      if (noteIndex === -1) {
        reject(new Error('E4403 : Forbihiden, it\'s like someone has remove the note'))
        return
      }

      const note = this.notesData[noteIndex]

      if (!id) {
        reject(new Error('E4002 : No id sent'))
      } else if (!title && !content) {
        reject(new Error('E4003 : Can\'t add an empty title and content Note'))
      } else if (!content) {
        content = ''
        this.notesData.splice(noteIndex, 1, { ...note, content, updateAt })
        resolve('Note Updated with error E2402')
      } else if (!title) {
        title = content.substr(0, 20)
        this.notesData.splice(noteIndex, 1, { ...note, title, updateAt })
        resolve('Note Updated with error E2401')
      } else {
        this.notesData.splice(noteIndex, 1, { ...note, title, content, updateAt })
        resolve('Note Updated')
      }
    })
  },
  deleteNotes: function (param) {
    return new Promise((resolve, reject) => {
      if (!param) {
        reject(new Error('E4001 : No param sent'))
      }

      const { id } = param

      const noteIndex = this.notesData.findIndex(item => {
        const isHasProperty = Object.getOwnPropertyDescriptors(item)
        return isHasProperty.id.value === id
      })

      if (noteIndex !== -1) {
        this.notesData.splice(noteIndex, 1)
        resolve(`Item deleted id:${id} index:${noteIndex}`)
      } else {
        reject(new Error('E4400 : Notes Not Found'))
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
  await myNote.addNotes({ title: 'Todo Hari Ini' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ content: 'Todo besok mancing di empang pak basuki' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Minggu Ini', content: 'Belum Ada' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Bulan Ini', content: 'Ikut Pelatihan PijarCamp' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Tahun Ini', content: 'banyak' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.updateNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.updateNotes({ id: 1, title: 'Todo Hari Ini', content: 'Nanti siang beli stock kopi di alfa' }).then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.deleteNotes({ id: 2 }).then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  // This action will invoking the bug
  // await myNote.updateNotes({ id: 2, content: 'Belum ada rencana' }).then(msg => console.table(msg)).catch(err => console.log(err.message))
  // await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
}
runApp()

// answer 4

const getNames = async () => {
  try {
    const fetchPerson = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await fetchPerson.json()

    const names = []
    data.map(person => {
      const { name } = person
      return names.push({ name })
    })

    console.log(names)
  } catch (error) {
    console.log(error.message)
  }
}

getNames()
