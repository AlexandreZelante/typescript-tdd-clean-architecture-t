# Carregar compras do cache

> ## Caso de sucesso
1. Sistema executa o comando "Carregar compras"
2. Sistema carrega os dados do cache
3. Sistema valida se o cache tem menos de 3 dias
4. Sistema cria uma lista de compras a partir dos dados do cache
5. Sistema retorna a lista de compras

> ## Exceção - Cache expirado
1. Sistema limpa o Cache
2. Sistema retorna uma lista vazia

> ## Exeção - Cache vazio
1. Sistema retorna erro
