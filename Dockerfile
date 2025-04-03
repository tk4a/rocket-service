# Используем официальный образ Node.js на Alpine Linux
FROM node:18-alpine 

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json перед установкой зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install 

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Используем легковесный веб-сервер для статики
RUN npm install -g serve

# Используем serve для запуска приложения
CMD ["serve", "-s", "dist", "-l", "8088"]