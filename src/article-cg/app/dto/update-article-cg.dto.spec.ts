import { UpdateArticleCgDto } from './update-article-cg.dto'

describe('UpdateArticleCgDto', () => {
  it('UpdateArticleCgDto : est defini ', () => {
    expect(new UpdateArticleCgDto()).toBeDefined()
  })

  it('UpdateArticleCgDto : les proprietés sont defini', () => {
    const updateArticleCgDto = new UpdateArticleCgDto()
    updateArticleCgDto.title = 'Titre'
    updateArticleCgDto.description = 'Petit contenu'

    expect(updateArticleCgDto.title).toBeDefined()
    expect(updateArticleCgDto.description).toBeDefined()
  })

  it('UpdateArticleCgDto : les proprietés sont defini', () => {
    const updateArticleCgDto = new UpdateArticleCgDto()
    updateArticleCgDto.title = 'Titre'
    updateArticleCgDto.description = 'Petit contenu'

    expect(updateArticleCgDto.title).toBeDefined()
    expect(updateArticleCgDto.description).toBeDefined()
  })
})
