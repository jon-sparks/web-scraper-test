const axios = require('axios')
const cheerio = require('cheerio')

const urls = [
    'https://www.driftworks.com/forum/forums/drift-cars-for-sale.23/',
    'https://www.driftworks.com/forum/forums/drift-cars-for-sale.23/page-2',
    'https://www.driftworks.com/forum/forums/drift-cars-for-sale.23/page-3',
    'https://www.driftworks.com/forum/forums/drift-cars-for-sale.23/page-4',
    'https://www.driftworks.com/forum/forums/drift-cars-for-sale.23/page-5'
] 

const selection = []

urls.forEach(url => {
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const results = $('.discussionListItem')

        results.each(function(){
            const name = $(this).find('.PreviewTooltip').text().toLowerCase()
            const url = $(this).find('.PreviewTooltip').attr('href')
            const thumbnail = $(this).find('.fc_threadth > img').attr('src')
            selection.push({
                name,
                url: `https://www.driftworks.com/forum/${url}`,
                thumbnail: (thumbnail.includes('driftworks') ? thumbnail : `https://www.driftworks.com/forum/${thumbnail}` )
            })
        })
        
    })
    .catch(console.error)
})

processUrls(urls)

setTimeout(() => {
    const filtered = selection.filter(car => car.name.includes('nissan'))
    console.log(filtered)
}, 5000)