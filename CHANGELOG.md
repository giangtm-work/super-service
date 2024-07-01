# Changelog
___

## 1.0.0
___
### Init project
```markdown
npx create-nx-workspace super-service --preset=nest
```
create-nx-workspace@19.3.2

* ✔ Application name · super-service
* ✔ Would you like to generate a Dockerfile? [https://docs.docker.com/] · Yes
* ✔ Do you want Nx Cloud to make your CI fast? · skip

### Pre-commit (https://dev.to/wdp/using-husky-pre-commit-git-hook-with-prettier-2h1)
#### Install Husky (https://typicode.github.io/husky/get-started.html)
```markdown
npm install --save-dev husky
npx husky init
```

#### Only format staged files
```markdown
npm install lint-staged --save-dev
```

### Install PostgreSQL

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads


```markdown
npm install --save @nestjs/typeorm typeorm pg
```

### Implement `Users` module
```markdown
npx nx g @nx/nest:library users --directory=modules/users
rm -rf modules/users/src/lib/users.module.ts
cd modules/users/
nx g @nx/nest:resource users --directory=src/lib 
```

#### Install class-validator & class-transformer
```markdown
npm i --save class-validator class-transformer

update: src/main.ts
```

### Implement shared libs
```markdown
npx nx g @nx/nest:library super-mapper --directory=libs/super-mapper --buildable=true --publishable=true
```

### Hash password
```markdown
npm i bcrypt
npm i -D @types/bcrypt
```
