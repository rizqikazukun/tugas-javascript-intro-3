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

// Used when working with a few promise
const isWorkingDay = cekHariKerja('sabtu')
isWorkingDay.then(result => console.log(result)).catch(error => console.log(error.message))

// Used when working with a much promise
const workingDayChecker = async () => {
  try {
    const day = 'minggu'
    const check = await cekHariKerja(day)
    console.log(check)
  } catch (error) {
    console.log(error.message)
  }
}

workingDayChecker()

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
          new Error(`Sorry Payment is rejected, Minimum TopUp is Rp.${minToup}`)
        )
      }
    })
  },
  useTicket: function () {
    return new Promise((resolve, reject) => {
      // Adjust the time to simulating to 6 AM
      // const currentTime = new Date('September 22, 2023 06:59:59').getHours().toFixed()

      const currentTime = new Date().getHours().toFixed()

      let entryPrice
      // it just able from 5AM to 6.59 AM
      if (currentTime >= 5 && currentTime < 7) {
        entryPrice = 2000
      } else {
        entryPrice = 3500
      }

      if (!(this.currentBalance < entryPrice)) {
        this.currentBalance -= entryPrice
        const theTime = currentTime <= 12 ? currentTime + ' AM' : currentTime - 12 + ' PM'
        const message = [
          `The time is ${theTime}. `,
          `Ticket price is Rp.${entryPrice}. `,
          'Thankyou for using our service, ',
          `Your current balance is Rp.${this.currentBalance}. `,
          'Enjoy The trip.'
        ]
        resolve(message[0] + message[1] + message[2] + message[3] + message[4])
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

      // Timestamp is just simulation for UTC +7 - 1day
      const currentTime = new Date().getTime()
      const createdAt = new Date(currentTime - 17 * 60 * 60 * 1000)

      const id = !this.notesData ? 1 : this.notesData.length + 1
      const note = { id, title, content, createdAt, updateAt: null }

      if (!title && !content) {
        reject(new Error('E4003 : Can\'t add an empty title and content note'))
      } else if (!title) {
        title = content.substr(0, 20)
        this.notesData.push({ ...note, title })
        resolve(`Note Added, id:${id}, with error E2401`)
      } else if (!content) {
        content = ''
        this.notesData.push({ ...note, content })
        resolve(`Note Added, id:${id}, with error E2402`)
      } else {
        this.notesData.push(note)
        resolve(`Note Added, id:${id}`)
      }
    })
  },
  readNotes: function () {
    return new Promise((resolve, reject) => {
      if (this.notesData.length === 0) {
        reject(new Error('E4400 : Note not found'))
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

      // Time stamp is just simulation for UTC +7 - 1day
      const currentTime = new Date().getTime()
      const updateAt = new Date(currentTime - 15 * 60 * 60 * 1000)

      const noteIndex = this.notesData.findIndex(item => {
        return item.id === id
      })

      // Known Bug : if this if valued as true, the error is able to catch but the program is not stop
      //             and keep the prosses.
      //             console.log(noteIndex == -1)
      // Bug is solved 2023/09/22
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
        resolve(`Note Updated, id:${id}, with error E2402`)
      } else if (!title) {
        title = content.substr(0, 20)
        this.notesData.splice(noteIndex, 1, { ...note, title, updateAt })
        resolve(`Note Updated, id:${id}, with error E2401`)
      } else {
        this.notesData.splice(noteIndex, 1, { ...note, title, content, updateAt })
        resolve(`Note Updated, id:${id}`)
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
        return item.id === id
      })

      if (noteIndex !== -1) {
        this.notesData.splice(noteIndex, 1)
        resolve(`Note Deleted, id:${id}, index:${noteIndex}`)
      } else {
        reject(new Error('E4400 : Note not found'))
      }
    })
  }
}

const runApp = async () => {
  // This function just for simulating user action.

  const busTicket = Ticketing
  await busTicket.useTicket().then(msg => console.log(msg)).catch(err => console.log(err.message))
  await busTicket.topup(7500).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await busTicket.topup(10000).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await busTicket.useTicket().then(msg => console.log(msg)).catch(err => console.log(err.message))
  await console.log('')

  const myNote = NoteApp
  await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.addNotes().then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Hari Ini' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ content: 'Todo besok mancing di empang pak rahman' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Minggu Ini', content: 'Belum Ada' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Bulan Ini', content: 'Ikut Pelatihan PijarCamp' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.addNotes({ title: 'Todo Tahun Ini', content: 'banyak' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  await myNote.updateNotes().then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.updateNotes({ id: 1, title: 'Todo Hari Ini', content: 'Nanti siang beli stock kopi di alfa' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.deleteNotes({ id: 2 }).then(msg => console.log(msg)).catch(err => console.log(err.message))
  await myNote.readNotes().then(msg => console.table(msg)).catch(err => console.log(err.message))
  // This action will invoking the bug (the bug is solved, action bellow will not invoke the bug)
  // await myNote.updateNotes({ id: 2, content: 'Belum ada rencana' }).then(msg => console.log(msg)).catch(err => console.log(err.message))
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

    console.table(names)
  } catch (error) {
    console.log(error.message)
  }
}

getNames()
