# Refatoração dos controladores

A refatoração mantém os componentes, seus arquivos `.meta`, os campos serializados e os métodos públicos utilizados pelas cenas e pelos botões.

- `DraggableItem` reúne inicialização, deslocamento ajustado à escala do canvas e tratamento de acertos e erros no arraste. `DragAndDrop` cuida da ordem visual; `DragAndDrop2` acrescenta redimensionamento; `DragAndDrop3` desenha a linha e desabilita o botão após um acerto. Novas variantes podem especializar os métodos virtuais sem duplicar o fluxo completo.
- `Scene1Controller` separa cliques corretos, cliques incorretos, animação e avanço de nuvens. Os métodos de entrada usam retornos antecipados para reduzir o aninhamento.
- `Scene2Controller` separa a seleção de objetos da sequência de explicações sobre árvores.
- `Scene3Controller` separa configuração das perguntas, respostas, conclusão e medição de tempo. As chamadas agendadas a métodos públicos usam `nameof` quando possível.

As regras de pontuação, tempos de áudio, transições e persistência existentes foram mantidas.

## Verificação

Os testes em `Assets/Tests/Editor` podem ser executados na aba **EditMode** do **Window > General > Test Runner**. Eles cobrem retorno à posição inicial, bloqueio após acerto, escala do canvas, restauração de tamanho e coordenadas da linha. Também verificam que os campos herdados continuam acessíveis pela serialização do Unity.

A montagem de testes usa reflexão para acessar os componentes de `Assembly-CSharp`, pois uma assembly definida por `.asmdef` não pode referenciar diretamente a assembly predefinida do jogo. Isso permite manter a organização atual dos scripts.

A validação local compila os scripts contra bibliotecas do Unity 2019.4.9f1 e executa os testes de arraste em um projeto temporário isolado. O projeto principal indica Unity 2019.4.17f1; a validação completa das cenas deve ocorrer nessa versão, com as credenciais locais do Google Sheets configuradas. Nenhuma credencial real é necessária para os testes de arraste.

Resultado local: compilação dos scripts concluída sem erros e 12 testes EditMode aprovados. A compilação usa uma classe temporária de credenciais fictícias, apenas para resolver as constantes ausentes no repositório; ela não faz parte das alterações do jogo e não acessa o Google Sheets.
