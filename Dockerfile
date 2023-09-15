FROM node:18

WORKDIR /app

# Install SSH server
# RUN apt-get update && apt-get install -y openssh-server
# RUN mkdir /var/run/sshd

# Set a root password (you might want to use a more secure method in production)
# RUN echo 'root:your_password' | chpasswd

# Permit root login via SSH
# RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 80

CMD ["npm", "start"]


