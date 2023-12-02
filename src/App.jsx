import axios from 'axios'
import React, { useState } from 'react'

const App = () => {
  const [file, setFile] = useState()
  const [state, setState] = useState()
  
  const handleFileChange = e => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  // useEffect(() => {
  //   console.log("state", state);
  //   console.log("file", file);
  // }, [state,file]);

  // function customFormDataSelim(formData, key, value) {
  //   if (!formData.__entries) {
  //     formData.__entries = [];
  //   }

  //   if (value instanceof File) {
  //     formData.__entries.push([key, value]);
  //   } else {
  //     formData.__entries.push([key, String(value)]);
  //   }

  //   formData.append(key, value);
  // }

  // FormData.prototype.selim = function (key, value) {
  //   customFormDataSelim(this, key, value);
  // };

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      /*
      Как Я понял, FORMDATA ЭТО КАК ФАЙЛ, ТО ЕСТЬ, КОТОРЫЙ МЫ ЛОЖИМ ЛИСТЬЯ ОТ ПРИНТЕРА,
       и Мы ложим туда файл и приклеиваем итикетку под названием 'selim' потом на сервере 
       есть комната (multer) с своими работниками, работник single который работает только 
       с файлами, ему  сообщается что пришел только один файл под названием selim  и он идет
        и смотрит на нее и проверяет есть ли этот файл selim или нет , если есть берет ее и 
        обрабатывает и помешает в req.file , если нет то сообщает что это не тот файл да ?

        ОТВЕТ ОТ CHATGPT: Да, ваша метафора правильная !

      */

        const User = {
          name: 'Sayd-selim',
          age:23,
          motivation: 'Деньги'
        }

      formData.append('file', file)
      // setNewState(formData)
      formData.append('User', JSON.stringify(User))

      formData.append('Test', 'So var im')
      formData.append('ItoBudetDoctupnoVreqBody', 'Petmat')
      // можешь назвать имя file как угодно ! но тогда и в метода single() тоже такое имя должно быть
      // Первый 'file' - это ключ, Второй - Значение
     

      // Отправка файла на сервер
      // if(newState) {
        await axios.post('http://localhost:3001/upload', formData)
        // console.log('data2',data2);
      // }



      // Получение данных с сервера
      const { data } = await axios.get('http://localhost:3001/loading')
      console.log('data',data);
      setState(data[data.length - 1])

      // console.log('response',data.length);
    } catch (error) {
      console.error('Error uploading file', error)
    }
  }
  // console.log('state', state.name)
  return (
    <div>
      <input type='file' accept='.png' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {state ? (
        <div>
          <h5>{'Имя Файла' + ': ' + state.name}</h5>
          <h5>{'Размер Файла' + ': ' + state.size + ' байт'}</h5>
          <h5>{'Тип Файла' + ': ' + state.type}</h5>
          <img
            src={`http://localhost:3001/loadFile/${state.name}`}
            alt='Uploaded File'
          />
          {/* Когда вы вставляете URL изображения в тег img, браузер отправляет HTTP 
          GET-запрос к этому URL для загрузки изображения. Это основное поведение тега img в HTML  */}
        </div>
      ) : (
        <p>Ожидание загрузки файла...</p>
      )}
    </div>
  )
}

export default App

/*

Процесс для отправки файла на сервер: {

// 1) создаем стейт для взятие файла и при изменение инпута берем оттуда файл

// 2) создаем Функцию и для onclick button

// 3) Создаем объект FormData для отправки файла на сервер 

// 4) Делаем post запрос чтобы отправить файл на сервер

// 5) настроиваем сервер, устанавливаем все библиотеки express, mongoose, cors(), multer, sharp

// 6) Устанавливаем связь с базой данных

// 7) создаем схему и модель

// 8) Делаем  post-обработчик запроса 

// 9) вызываем multer()

// 10) через метод single из multer, делаем обработку файла  (это делаем в post-запросе, то есть, как мидлевар) после этого наш файл будет в req.file

// 11) Вызываем модель и передаем данные из запроса, если хотим, то есть, те данные, которые хотим отправить на сервер

// 12) Потом сохраняем данные на сервере


// Это Мы делаем, чтобы сохранить файл в нашем проекте и последующем взять из нашего проекта
// 13) Передаем наш буффер-файла в Функцию sharp(сюда) и вызываем у него метод toFile(здесь указываем путь для сохранение файла в проекте)

// 14) потом возвращаем через res.send(ответ клиенту, можно любое сообщение)

}

*/










/* 

Процесса для рендера файла с сервера на фронт: {

// 13) Указать в тег src локальный адрес с именем файла, которого отправили на сервер, чтобы браузер сам сделал запрос на сервер

// 14) На сервер делаем мидлевар с использованием static() из express, который будет слушать тот адрес, на который будет сделан запрос Браузера

// 15) Делаем Get-запрос на получение файла из сервера

// 16) Создаем State для хранения данных файла из сервера

// 17)  Делаем Get-обработчик запроса, который будет передовать файл из сервера

// 18) Вытаскиваем базу данных из mongoDB и возвращаем ее клиенту через res
} 

*/ 
