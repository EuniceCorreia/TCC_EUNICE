# TCC Eunice – Refatoração de código com IA

Versões refatoradas de três projetos, geradas pelo **Claude Code** e pelo **Codex**, com dois tipos de prompt.

```
claude/
  prompt_simples/     # "Prompt Mariana - Simples"
    memoletrando/
    querida-floresta-2.0/
    SpeakSnake/
  prompt_detalhado/   # "Prompt detalhado e específico"
    ...
codex/
  prompt_simples/
  prompt_detalhado/
```

Dependências (`node_modules`, `vendor`), pastas geradas pelo Unity (`Library`, `Temp`), builds (`dist`)
e arquivos com credenciais (`props.properties`, `.env`, `Credentials.cs`) não estão no repositório.
Para executar os projetos, é preciso reinstalar as dependências e recriar esses arquivos de configuração.
