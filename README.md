# Blist Api

## 🔗 Documentação
- Principal: https://blist-api.onrender.com/
- Secundária: https://blist-api.onrender.com/docs/

## Rodando a aplicação localmente 🧑‍💻
- Baixe este repositório ou faça o fork em seu computador, e em seguida instale as dependências do site com o comando: `yarn`
- Depois de baixar as dependências, você precisa ter um database postgreSQL configurado de acordo com o que está descrito no arquivo .env.example, as demais variavéis é preciso para o funcionamento de **confirmação da conta** e **recuperação de senha**, recomendo o uso de serviços como o [mailtrap](https://mailtrap.io/).
- Em seguida, execute a migração para criação das tabelas do banco de dados usando o comando: `yarn typeorm migration:run -d src/data-source`
- Se tudo deu certo (rsrs), o servido e o banco estão conectatos e prontos para uso, agora é só inicializar o servidor e conectar-se ao banco de dados, para isso execute o comando: `yarn dev`
- Pronto, agora aproveite e teste as funcionalidades da aplicação, qualquel dúvida consulte a documentação acima. 👋
