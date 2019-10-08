import prepareTheDescription from '../../selectors/prepareTheDescription'

test('prepareTheDescription should return shorter description if more than 19 words', () => {
   const book = {
      volumeInfo: { description: 'w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 w15 w16 w17 w18 w19 w20 w21 w22 w23' }
   }
   const description = prepareTheDescription(book)
   expect(description).toBe('w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 w15 w16 w17 w18 w19...')
})

test('prepareTheDescription should return description if 19 words or less without any changes', () => {
   const book = {
      volumeInfo: { description: 'w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 w15 w16 w17 w18 w19' }
   }
   const book2 = {
      volumeInfo: { description: 'w1 w2 w3 w4 w5 w6 w7 w8 w9 w10' }
   }
   const description = prepareTheDescription(book)
   expect(description).toBe('w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 w15 w16 w17 w18 w19')
   const description2 = prepareTheDescription(book2)
   expect(description2).toBe('w1 w2 w3 w4 w5 w6 w7 w8 w9 w10')
})

test(`prepareTheDescription should return "The book doesn't have a description" if no description`, () => {
   const book = {
      volumeInfo: {}
   }
   const description = prepareTheDescription(book)
   expect(description).toBe("The book doesn't have a description")
})