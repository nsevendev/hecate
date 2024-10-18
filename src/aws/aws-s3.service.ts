import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { BadRequestException, Injectable } from '@nestjs/common'

dotenv.config({ path: path.resolve(__dirname, '../../.env.dev.local') })

export const fileSchema = z.object({
    size: z.number(),
    buffer: z.instanceof(Buffer),
    originalname: z.string(),
    mimetype: z.string(),
})

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME

@Injectable()
export class AwsS3Service {
    private readonly client: S3Client

    constructor() {
        if (!AWS_ACCESS_KEY) {
            throw new Error(`Invalid AWS_ACCESS_KEY, ${AWS_ACCESS_KEY}`)
        }
        if (!AWS_SECRET_ACCESS_KEY) {
            throw new Error(`Invalid AWS_SECRET, ${AWS_SECRET_ACCESS_KEY}`)
        }
        if (!AWS_REGION) {
            throw new Error(`Invalid AWS_REGION, ${AWS_REGION}`)
        }

        const client = new S3Client({
            credentials: {
                accessKeyId: AWS_ACCESS_KEY,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
            region: AWS_REGION,
        })
        this.client = client
    }

    async uploadFile({ file }: { file: z.infer<typeof fileSchema> }) {
        const createdId = createId()
        const fileKey = createdId + file.originalname
        const putObjectCommand = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: fileKey,
            ContentType: file.mimetype,
            Body: file.buffer,
            CacheControl: 'max-age=31536000',
        })

        const result = await this.client.send(putObjectCommand)
        if (result.$metadata.httpStatusCode !== 200) {
            console.error(result)
        }
        return { fileKey }
    }

    async deleteFile({ fileKey }: { fileKey: string }) {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: fileKey,
        })

        const result = await this.client.send(deleteObjectCommand)
        if (result.$metadata.httpStatusCode !== 200 && result.$metadata.httpStatusCode !== 204) {
            console.error(result)
            throw new BadRequestException('Une erreur est survenue lors de la suppression du fichier sur aws')
        }

        return result
    }

    async getFileUrl({ fileKey }: { fileKey: string }) {
        const getObjectCommand = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: fileKey,
        })

        const result = await getSignedUrl(this.client, getObjectCommand)
        return result
    }
}
