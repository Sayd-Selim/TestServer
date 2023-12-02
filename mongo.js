import express from 'express';
import {
  connect,
  model
} from 'mongoose';
import multer from 'multer';
import cors from 'cors';
// import sharp from 'sharp';

const app = express();
app.use(cors());
app.use('/loadFile', express.static('./src/uploads'));
app.use(express.json())

// app.use('/proverka',(req,res,next) => {
//   console.log('Проверка прошла успешна !');
//   next()
// })


// Если придет запрос на '/loadFile' , то получаешь доступ к папке uploads из src

/*Мы отправляем запрос, app.use() смотрит на адрес после http://localhost:3001 
если там uploads то static вызывается и  он получает доступ к моему проекту 
и отправляет ее обратно*/

// Подключение к MongoDB
connect('mongodb+srv://Saydselim:wwwwww@cluster0.wc20wqz.mongodb.net/AyMed');

// Модель для хранения файлов в MongoDB
const File = model('file', {
  name: String,
  size: Number,
  type: String,
  buffer: String,
  User: {
    name: String,
    age:Number,
    motivation: String
  },
  Test: String,
  tutMojnoLuboeImy: String
});

// Middleware для обработки файлов

const selim = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file);
    cb(null, './src/uploads')
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: selim
});

// Обработка запроса на загрузку файла
app.post('/upload', upload.single('file'), async (req, res) => {
  // метод single() добавляет у Себя в логике в объект req, свойство req.file с его значениями.
  console.log('req.file', req.file);
  console.log('req.body:',  req.body.Test);
  try {
    const file = req.file;

    const body = JSON.parse(req.body.User)
  
    
    


    // Получаем свои данные из запроса (в данном случае из поля 'customData')


    // Создаем новую запись в базе данных
    const newFile = new File({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      User: {
        name: body.name,
        age:body.age,
        motivation: body.motivation,
      },
      Test: req.body.Test,
      tutMojnoLuboeImy: req.body.ItoBudetDoctupnoVreqBody
      
    });

    await newFile.save();
    // Создаем URL для файла на основе _id

    // const imageBuffer = await sharp(req.file.buffer).toBuffer();
    // console.log('imageBuffer',imageBuffer);

    // Сохранение преобразованного изображения
    // Замените 'uploads' на вашу папку назначения
    // await sharp(req.file.buffer).toFile(`./src/uploads/${newFile.name}`);



    // Возвращаем URL клиенту
    res.send('Файл успешно сохранен !');
  } catch (error) {
    console.error('Error uploading file', error);
    res.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

app.get('/loading', async (req, res) => {
  try {
    const data = await File.find();
    // console.log('data',data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from server', error);
    res.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});



/*  

Middleware, который будет выполняться для всех запросов
app.use((req, res, next) => {
  console.log('Middleware для всех запросов');
  next(); // Передает управление следующему middleware
});

 
Middleware, который будет выполняться только для запросов по пути '/special'
app.use('/special', (req, res, next) => {
  console.log('Middleware для запросов по пути /special');
  next();
}); 












// Портовый контроль (первый сотрудник)
app.use((req, res, next) => {
  console.log('Портовый контроль: Проверяем посылку');
  next(); // Передаем посылку следующему сотруднику
});

// Сотрудник по добавлению штрих-кода (второй сотрудник)
app.use((req, res, next) => {
  console.log('Сотрудник: Добавляем штрих-код');
  next(); // Передаем посылку следующему сотруднику
});

app.get('/', (req, res) => {
  res.send('Посылка доставлена!');
});



В этом примере каждый middleware выполняет свою задачу при обработке запроса,
 и next() передает запрос следующему middleware в цепочке. Когда запрос доходит до
  конечного обработчика (в данном случае, обработчика для маршрута /), посылка (запрос)
   считается доставленной.
*/