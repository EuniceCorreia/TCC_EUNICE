# SpeakSnake

Jogo educativo no estilo prática de pronúncia de palavras em português, com reconhecimento e síntese
de voz no navegador.

## Configuração

1. Copie `config/props.properties.example` para `config/props.properties` e preencha com as
   credenciais do seu banco MySQL.
2. Aponte o document root do seu servidor web para a pasta `public/`.
3. Crie o schema do banco com as tabelas `ssusers`, `ssscores` e `ssinfos`.