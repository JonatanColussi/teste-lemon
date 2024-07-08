# Teste [Lemon Energia](https://www.energialemon.com.br/)

[![CI](https://github.com/JonatanColussi/teste-lemon/actions/workflows/main.yml/badge.svg)](https://github.com/JonatanColussi/teste-lemon/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/84f90fc23cfe71c7bfe0/maintainability)](https://codeclimate.com/github/JonatanColussi/teste-lemon/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/84f90fc23cfe71c7bfe0/test_coverage)](https://codeclimate.com/github/JonatanColussi/teste-lemon/test_coverage)

Api for Check a new client eligibility

## Usage

```bash
curl --location 'https://8xuw7omdw1.execute-api.us-east-1.amazonaws.com/dev/eligibility' \
--header 'Content-Type: application/json' \
--data '{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878, 
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ]
}'
```
