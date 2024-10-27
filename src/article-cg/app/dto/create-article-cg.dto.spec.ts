import { CreateArticleCgDto } from './create-article-cg.dto'

describe('CreateArticleCgDto', () => {
  it('CreateArticleCgDto : est defini ', () => {
    expect(new CreateArticleCgDto()).toBeDefined()
  })

  it('CreateArticleCgDto : les proprietés sont defini', () => {
    const createArticleCgDto = new CreateArticleCgDto()
    createArticleCgDto.title = 'Titre'
    createArticleCgDto.description = 'Petit contenu'

    expect(createArticleCgDto.title).toBeDefined()
    expect(createArticleCgDto.description).toBeDefined()
  })

  it('CreateArticleCgDto : les proprietés sont defini', () => {
    const createArticleCgDto = new CreateArticleCgDto()
    createArticleCgDto.title = 'Titre'
    createArticleCgDto.description = 'Petit contenu'

    expect(createArticleCgDto.title).toBeDefined()
    expect(createArticleCgDto.description).toBeDefined()
  })
})
