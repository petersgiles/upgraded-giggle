interface ReccomendationResponse {
  Id: number
  Title: string
  ID?: number
  Policy?: {
    Id: number
  }
  Brief?: {
    Id: number
  }
  Recommendation?: {
    Id: number
  }
  Last_x0020_Modified?: any
  Editor?: any
}

export const recommendationResponses: ReccomendationResponse[] = [
  {
    Id: 1,
    Recommendation: {
      Id: 87
    },
    Brief: {
      Id: 52
    },
    Title: 'Agree',
    Last_x0020_Modified: '2019-08-22T01:11:20Z',
    Editor: {
      Id: 91,
      Name: 'Peter Giles',
      Email: 'peter.giles@pmc.gov.au'
    }
  },
  {
    Id: 2,
    Recommendation: {
      Id: 88
    },
    Brief: {
      Id: 52
    },
    Title: 'Disagree',
    Last_x0020_Modified: '2019-08-22T01:11:20Z',
    Editor: {
      Id: 91,
      Name: 'Peter Giles',
      Email: 'peter.giles@pmc.gov.au'
    }
  }
]
