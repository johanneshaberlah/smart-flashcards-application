interface Card {
    id: bigint,
    uniqueId: string,
    question: string,
    answer: string
    hint: string
    maturity: CardMaturity
    difficultyAndDurations: DifficultyAndDuration[]
}