import { useMultiFileAuthState, makeWASocket } from '@whiskeysockets/baileys';
import { writeNumber, checkNumber, checkDate } from './service/json-service.js';
import { katabijak } from './service/apis-service.js';
// import { readFile } from 'fs';


// const JSONraw = readFile('config.json', (err, data) => data);
// const JSONConfig = JSONraw.parse();

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
async function connectToWhatsapp() {
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
    })
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === "close") {
            console.log('connection closed due to ', lastDisconnect.error, ',  ')
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    
    sock.ev.on ('creds.update', saveCreds)
    sock.ev.on ('messages.upsert', async ({messages, type}) => {
        if(type === 'notify') {
            
            if(!messages[0].key.fromMe && !messages[0].key.participant) {
                //tentukan jenis pesan berbentuk text                
                const pesan = messages[0].message.conversation;

                //tentukan jenis pesan apakah bentuk button
                const responseButton = messages[0].message.buttonsResponseMessage;
                
				//nowa dari pengirim pesan sebagai id
                const noWa = messages[0].key.remoteJid;
                // timestamp dari pengirim pesan
                const timeWhatsapp = messages[0].messageTimestamp;
                // nama pengirim
                const nameSender = messages[0].pushName;
                // id pesan
                const idMessage = messages[0].key.id;
				await sock.readMessages([messages[0].key]);
                //kecilkan semua pesan yang masuk lowercase 
                const pesanMasuk = pesan.toLowerCase();

                if(!messages[0].key.fromMe && pesanMasuk.includes('/help')) {
                    const isiPesan3 = `Kami Memiliki 2 varian Rasa. Ayam dan Abon. \nuntuk memesan ketik /pesan nama#alamatpengiriman#varianrasa#kuantitas \nContoh: /pesan AndiPrasojo#SMKN1Bangsri#abon#3`;
                    setTimeout(() => {
                        sock.sendMessage(noWa, {text: isiPesan3},{quoted: messages[0] });
                    }, 2000)
                    
                    console.log(`Pesan Masuk dari ${noWa} dengan pesan ${pesanMasuk}`);
                    



            } else if(!messages[0].key.fromMe && pesanMasuk.includes("/pesan")) {
                      let a = pesanMasuk.slice(7);
                      let b = a.split("#");
                      const isiPesan4 = `Terimakasih telah membeli☺☺,
                      berikut detail pesanan kamu \n
                      Nama : ${b[0]} \n
                      Alamat Pengirirman : ${b[1]} \n
                      Varian Rasa: Lempita ${b[2]} \n
                      Kuantitas: ${b[3]} pcs \n
                      *TOTAL* Rp.${b[3]*2000},00 \n
                      baik... pesanan kamu telah terkirim ke kami.`;
                      const isiPesan5 = `terimakasih telah membeli produk kami. apa ada yang lain`;
                      setTimeout(() => {
                        sock.sendMessage(noWa, {text: isiPesan4});
                      }, 3000);
                      setTimeout(() => {
                        sock.sendMessage(noWa, {text: isiPesan5});
                      }, 3500);
                      const sendOrdertoGroup = `Ada Pesanan baru!!! dari ${noWa}, dengan Order sebagai berikut: \n Nama: ${b[0]} \n Alamat Pengiriman: ${b[1]} \n Rasa: ${b[2]} \n Kuantitas: ${b[3]}, dengan Total yang harus dibayarkan ${b[3]*2000}. jika produk habis beritahu dengan klik link http://wa.me/${noWa.slice(0, 13)}`;
                      await sock.sendMessage('120363193169257427@g.us', {text: sendOrdertoGroup}); // isi id group
                    

                      



            } else if(!messages[0].key.fromMe && pesanMasuk && !messages[0].key.participant){
                    // checkNumber(noWa, (result) => {
                    //     if(result){
                    //         const isiPesan = `halo ${nameSender}, Selamat datang Kembali!🤗🤗`;
                    //         const isiPesan1 = `Rasakan Nikamtnya LEMPITA LEMPER enak dan mengenyangkan!!!`;
                    //         const isiPesan2 = `ketikan /help untuk melihat cara anda memesan`;
                    //         sock.sendMessage(noWa, {text: isiPesan}); 
                    //         sock.sendMessage(noWa, {text: isiPesan1}); 
                    //         sock.sendMessage(noWa, {text: isiPesan2}); 
                            
                    //     } else {
                    //         writeNumber(noWa, timeWhatsapp, nameSender);
                    //         const isiPesanBaru = `halo ${nameSender}, Selamat Datang anda pendatang baru`;
                    //         sock.sendMessage(noWa, {text: isiPesanBaru});
                    //     }
                    // });  
                    const buttonMessage = {
                        caption: `halo ${nameSender}, Selamat datang🤗🤗`,
                        image: {url: './image/head.jpg'}
                    }
                            
                            const isiPesan1 = `Rasakan Nikamtnya *LEMPITA LEMPER* yang enak dan mengenyangkan!!!`;
                            const isiPesan2 = `ketikan /help untuk melihat cara anda memesan`;
                            setTimeout(() => {
                                sock.sendMessage(noWa, {text: isiPesan1}); 
                            }, 3000);
                            setTimeout(() => {
                                sock.sendMessage(noWa, {text: isiPesan2});
                            }, 5000);
                            setTimeout(() => {
                                katabijak((result) => {
                                    sock.sendMessage(noWa, {text: `Kata bijak Hari ini: \n_"${result[0]}"_ - ${result[1]}`})
                                })
                            }, 6000);
                            await sock.sendMessage(noWa, buttonMessage); 
                            
                             
                    // function benar() {
                    //     const isiPesan = `halo ${pushName}, Selamat datang Kembali!🤗🤗`;
                    //     sock.sendMessage(noWa, {text: isiPesan});  
                    // }
                    // function salah() {
                    //     const isiPesanBaru = `halo ${nameSender}, Selamat Datang anda pendatang baru`;
                    //     sock.sendMessage(noWa, {text: isiPesanBaru});
                    // }
                    console.log(`Pesan Masuk dari ${noWa} dengan pesan ${pesanMasuk}`);
                }
                // } else if(!messages[0].key.fromMe && pesanMasuk) {
                //     const pesan = encodeURIComponent(pesanMasuk) ;
                //     fetch(`https://api.akuari.my.id/simi/simi2?query=${pesan}`, {
                //         retry: {
                //           maxAttempts: 3,
                //           minTimeout: 1000,
                //           maxTimeout: 5000,
                //         },
                //     })
                //         .then(res => res.json())
                //         .then(res => {kirimSimsimi(res)})
			    //         .catch( err => console.log("Fetch Gagal " + err))
                //     console.log(`Pesan Masuk dari ${noWa} dengan pesan ${pesanMasuk}`);    
                //     async function kirimSimsimi(response) {
                //         console.log(response.respon ? response.respon : "gak dijawab ea");
                //         await sock.sendMessage(noWa, {text: response.respon});
            }
        }
    })
}

connectToWhatsapp()
