## Access token:

- **Para que serve?**
  - Pegar, atualizar, inserir ou deletar informações do usuário
- **Duração**
  - Dura pouco/minímo possível
- **Riscos se ele vazar**
  - Quanto maior o tempo de vida dele, maior pode ser o estrago que quem tiver o token pode fazer.

## Refresh token

- **Para que serve?**
  - Para não precisar pedir a senha e o usuário para gerar um novo access_token
- **Duração**
  - Longa
  - O refresh token no Backend está associado ao usuário de alguma forma
  - O backend pode refogar a validade desse token a qualquer momento
- **Risco se ele vazar**
  - Se ele vazar, o usuário novo pode gerar novos tokens INFINITAMENTE (access_token, refresh_token)
