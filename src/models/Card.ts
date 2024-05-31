interface Card {
    id: bigint,
    uniqueId: string,
    question: string,
    answer: string
    maturity: CardMaturity
    difficultyAndDurations: DifficultyAndDuration[]
}