const Web3 = require('web3')
const HDWallet = require('@truffle/hdwallet-provider')
require('dotenv').config({ path: './.env' })
const fs = require('fs')

const private = process.env.PRIVATE
const rpc = process.env.MUMBAI

// Inisialisasi Web3 dengan provider
const web3 = new Web3(new HDWallet(private, rpc))
var jsonFile = 'abi.json'
// Deklarasi kontrak ABI
const contractAbi = JSON.parse(fs.readFileSync(jsonFile))
const contractAddress = process.env.CONTRACT

// Buat instance kontrak menggunakan kontrakAbi dan contractAddress
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress)

// Deklarasi array alamat penerima
const penerima = [
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
  '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B'
]

const jumlah = web3.utils.toWei('0.001', 'ether')

const main = async () => {
  // Panggil fungsi sendEther dari kontrak dan kirim transaksi
  await contractInstance.methods
    .kirimKeTuyul(penerima, jumlah)
    .send({
      from: '0xD4527e765a30Fc7C3aDa5394c9590F787Fa0368B',
      value: jumlah * penerima.length
    })
    .on('transactionHash', function (hash) {
      console.log('Transaksi sukses, hash: ' + hash)
      process.exit(1)
    })
    .on('error', function (error) {
      console.error('Transaksi gagal, error: ' + error)
      process.exit(1)
    })

}

main()
