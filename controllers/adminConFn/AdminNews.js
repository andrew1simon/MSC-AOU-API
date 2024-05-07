const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function CreateNewNewsV2(req, res) {
    let { title, content, hasImg, subTitle , img} = req.body;
        async function createNewsWithRevision(revisionData) {
        // Start a transaction
            const result = await prisma.$transaction(async (prisma) => {
                // Create a News item
                const news = await prisma.news.create({
                data: {},
                })

                // Create a NewsRevisions item with the newsId set to the id of the News
                const newsRevision = await prisma.newsRevisions.create({
                data: {
                    newsId: news.id,
                    ...revisionData,
                },
                })

                // Create a CurrentRevision item with the newsId set to the id of the News
                // and the revisionId set to the id of the NewsRevisions
                const currentRevision = await prisma.currentRevision.create({
                data: {
                    newsId: news.id,
                    revisionId: newsRevision.id,
                },
                })

                return { news, newsRevision, currentRevision }
            })

            return result
        }
    const user = req.user;
    createNewsWithRevision({
    status: 'Published',
    title: title,
    subTitle: subTitle,
    content: content,
    CreatedBy: user.id,
    })
    .then((result) => {
        res.status(201).json({ msg: 'News Created'  , result})
    })
    .catch((e) => {
        throw e
    })
}

async function GetNewsByIdV2(req, res) {
    const { id } = req.params;
    try {
        const news = await prisma.news.findUnique({ where: { id } , select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

async function UpdateNews (req, res) {
    const {id , title, content, subTitle, img} = req.body;
    const { user } = req;
    const result = await prisma.$transaction(async (prisma) => {
        const newsRevision = await prisma.newsRevisions.create({
            data: {
                title,
                content,
                subTitle,
                img,
                news: {
                    connect: {
                        id,
                    },
                },
                user: {
                    connect: {
                        id: user.id,
                    },
                }
            },
        });
        const currentRevision = await prisma.currentRevision.update({
            data: {
                revisionId: newsRevision.id,
            },
            where: {
                newsId: id,
            },
        });
        return { newsRevision, currentRevision };
    })
    res.status(200).json({ msg: 'News Updated', result });

}

async function DeleteNews(req, res) {
    const { id } = req.params;
    try {
        await prisma.currentRevision.delete({ where: { newsId:id } });
        await prisma.newsRevisions.deleteMany({ where: { newsId:id } });
        await prisma.news.delete({ where: { id } });
        res.status(200).json({ msg: 'News Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
     CreateNewNewsV2 , GetNewsByIdV2 , UpdateNews , DeleteNews
}