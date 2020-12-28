import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {

    const categories = [
      {id: 1, name: "Lazer", descripton: "Cinema, parques, shows, etc"},
      {id: 2, name: "Moradia", descripton: "Pagamentos de contas de casa"},
      {id: 3, name: "Saúde", descripton: "Plano de saúde e remédios"},
      {id: 4, name: "Salário", descripton: "Recebimento de salário"},
      {id: 5, name: "Freelas", descripton: "Trabalho como Freelancer"}
    ];

    return { categories }
  }

}
