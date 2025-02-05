# 🌐 **Nuvem Corporativa 3D – Sentimentos ao Longo do Ano**

## 📌 **Sobre o Projeto**
**Nome do Projeto:** **WordFlow 3D** – Sentimentos Corporativos em Tempo Real

**Descrição:**
O **WordFlow 3D** é uma aplicação interativa e minimalista projetada para capturar e exibir, em tempo real, as palavras que refletem o sentimento dos colaboradores de uma empresa ao longo do ano. A visualização ocorre por meio de uma **nuvem de palavras 3D**, exibida de forma dinâmica e elegante em telas externas e internas da empresa.

A interface é moderna e fluida, permitindo que os colaboradores enviem palavras de forma anônima. O sistema registra e exibe os dados acumulados ao longo dos meses, oferecendo um panorama visual do estado emocional da equipe.

## 🚀 **Tecnologias Utilizadas**
O **WordFlow 3D** foi desenvolvido com um conjunto de tecnologias modernas para garantir alta performance, interatividade e uma experiência visual sofisticada.

### 📌 **Frontend (Interface Gráfica – React + Three.js)**
- **React** – Estrutura a aplicação frontend e permite a criação de componentes reutilizáveis.
- **Vite** – Ferramenta de build rápida para otimizar o desenvolvimento.
- **@react-three/fiber** – Framework baseado em Three.js para renderizar a nuvem de palavras em **WebGL**.
- **@react-three/drei** – Extensões utilitárias para facilitar animações e posicionamentos no ambiente 3D.
- **React-Spring** – Biblioteca de animações utilizada para criar efeitos suaves ao adicionar palavras.
- **Socket.io-client** – Comunicação em tempo real entre o frontend e o backend.

### 📌 **Backend (API e WebSockets – Node.js + Express)**
- **Express.js** – Framework leve e rápido para lidar com requisições HTTP.
- **Socket.io** – Permite comunicação em tempo real, garantindo que novas palavras sejam exibidas instantaneamente.
- **MongoDB + Mongoose** – Banco de dados NoSQL para armazenar palavras e suas estatísticas.
- **Helmet** – Adiciona camadas de segurança HTTP.
- **Cors** – Controle de permissões para acesso externo.
- **Morgan** – Middleware para monitoramento e logging de requisições.

### 📌 **Infraestrutura (Deployment + Segurança)**
- **Docker** – Containeriza a aplicação para facilitar o deploy e a escalabilidade.
- **Nginx** – Configurado como **proxy reverso**, gerenciando as conexões e garantindo eficiência.
- **Scripts Shell (start.sh e wait-for.sh)** – Automação para garantir que os serviços estejam rodando corretamente antes da aplicação iniciar.

## 🖥️ **Funcionalidades**
✅ **Nuvem de Palavras 3D Dinâmica** – Cada palavra enviada aparece instantaneamente na nuvem com efeitos suaves e modernos.
✅ **Efeito de Destaque** – Se a palavra já existe, um efeito visual elegante realça sua presença.
✅ **Timeline Mensal** – No topo da página, os usuários podem visualizar palavras registradas em diferentes meses.
✅ **Campo de Entrada Minimalista** – Localizado no canto inferior direito, permitindo que os colaboradores adicionem palavras de forma intuitiva.
✅ **Animações Sofisticadas** – Palavras são adicionadas com transições suaves, proporcionando uma experiência moderna e fluida.
✅ **Interatividade ao Passar o Mouse** – Ao passar o cursor sobre uma palavra, a interface exibe o número de ocorrências e as regiões que mais contribuíram com aquela palavra.
✅ **Suporte para TVs Corporativas** – A exibição full-screen permite que a aplicação seja usada em monitores e telas externas na empresa.

## 🔮 **Futuro do Projeto**
💡 **Classificação por Sentimento** – Implementação de um sistema de **análise semântica**, que atribuirá cores às palavras conforme o seu sentimento (positivo, neutro, negativo).
💡 **Dashboard Analítico** – Gráficos e insights sobre a evolução dos sentimentos ao longo do tempo.
💡 **Integração com IA** – Uso de modelos de **machine learning** para detectar padrões de emoções baseados nas palavras enviadas.

## 🤖 **Desenvolvimento com ChatGPT**
Este projeto foi planejado e estruturado com auxílio do **ChatGPT**, utilizando **técnicas avançadas de engenharia de prompt** para otimizar a documentação e organização da aplicação. A abordagem garantiu um desenvolvimento alinhado com **boas práticas de arquitetura, performance e design minimalista**.

## 📜 **Conclusão**
O **WordFlow 3D** é uma ferramenta inovadora para medir o clima organizacional através da participação ativa dos colaboradores. Sua interface moderna, suporte a WebGL e animações fluidas proporcionam uma experiência visual envolvente, sendo ideal para uso em ambientes corporativos com telas públicas. Conforme novas funcionalidades forem adicionadas, a aplicação poderá oferecer insights mais profundos sobre o sentimento dos funcionários ao longo do ano.

---
📢 **Sugestões e melhorias são sempre bem-vindas!** Caso queira colaborar, contribuir ou sugerir novas ideias, entre em contato! 🚀

