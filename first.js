const fs = require('fs');
const net = require('net');
const filename = process.argv[2];
if(!filename){
    throw Error('Error: No filenamespecified.');
}
net.createServer(connection=> {
    // Журналируем.
    console.log('Кто-то присоединился.');
    connection.write(`Следим за изменениями в "${filename}"...\n`);
    // Поставили наблюдение.
    fs.watchFile(filename, () => connection.write(`Файл изменён: ${new Date()}\n`))
    // Подчищаем за собой.
    connection.on('close', () => {
        console.log('Клиент отвалился.');
        fs.unwatchFile(filename);
    });
}).listen(60300, () => console.log('Встали на прослушку...'));