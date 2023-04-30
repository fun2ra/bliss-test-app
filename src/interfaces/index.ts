export interface QuestionType {
    key: number,
    image_url: string,
    published_at: string,
    question: string,
    thumb_url: string,
    choices: ChoicesType[]
}

export interface ChoicesType {
    choice: string, 
    votes: number
}

export interface ShareFormType {
    email: string
}

export interface FilterFormType {
    filter: string
}
