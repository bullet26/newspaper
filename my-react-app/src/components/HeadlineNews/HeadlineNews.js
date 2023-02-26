import './HeadlineNews.scss';
import { GetTopNews } from '../../services/GETNews';
import { useState } from 'react';
import imgDef from './img/img.png';

const HeadlineNews = () => {
    const [aciveSlideNumber, setAciveSlideNumber] = useState(1);

    const { TOPnews, fetchStatus } = GetTopNews();
    console.log(TOPnews, fetchStatus);

    let items;

    if (fetchStatus === 'confirmed') {
        items = TOPnews.map((item, i) => {
            const { title, img, url } = item;

            return (
                <a href={url} className={i === aciveSlideNumber - 1 ? 'headline-item active' : 'headline-item'} key={i}>
                    {!!img ? (
                        <img src={img} alt='news' />
                    ) : (
                        <img
                            src='https://i.guim.co.uk/img/media/aac739d62447f8bc987098444e6c1b02771e0212/0_297_1080_648/master/1080.jpg?width=620&quality=45&dpr=2&s=none'
                            alt='russian-warship-go-f'
                        />
                    )}
                    <span className='headline-item-title'>{title.length < 75 ? title : title.slice(0, 75) + '...'}</span>
                </a>
            );
        });
    }

    const ChangeSlige = action => {
        const totalSlides = TOPnews.length;

        if (action === 'next' && aciveSlideNumber < totalSlides) {
            setAciveSlideNumber(aciveSlideNumber + 1);
        }

        if (action === 'next' && aciveSlideNumber >= totalSlides) {
            setAciveSlideNumber(1);
        }

        if (action === 'prev' && aciveSlideNumber > 1) {
            setAciveSlideNumber(aciveSlideNumber - 1);
        }

        if (action === 'prev' && aciveSlideNumber <= 1) {
            setAciveSlideNumber(totalSlides);
        }
    };

    const View = () => {
        const activeSlideTitleDefault = 'Андрій Єрмак: «В нас інші прізвища, ніж у творців Мінських угод. Людей, які б таке допускали, в нашій команді немає»';
        const title = TOPnews[aciveSlideNumber - 1].title;
        const activeSlideTitle = title.length < 90 ? title : title.slice(0, 90) + '...';

        const img =
            TOPnews[aciveSlideNumber - 1].image ||
            `linear-gradient(180deg, rgba(21, 35, 56, 0.5) 0%, rgba(17, 29, 46, 0.24) 21.74%, rgba(17, 29, 46, 0.4) 62.16%, rgba(24, 40, 64, 0.9) 100%), url(${imgDef})`;

        return (
            <div className='headline' style={{ backgroundImage: img }}>
                <div className='container'>
                    <h2 className='headline-title'>{activeSlideTitle || activeSlideTitleDefault}</h2>
                    <div className='arrow-wrapper'>
                        <span className='arrow-circle' onClick={() => ChangeSlige('prev')}>
                            <span className='arrow-prev'></span>
                        </span>
                        <span className='slides'>
                            {aciveSlideNumber || 0} / {TOPnews.length}
                        </span>
                        <span className='arrow-circle' onClick={() => ChangeSlige('next')}>
                            <span className='arrow-next'></span>
                        </span>
                    </div>
                    <div className='headline-wrapper'>{items}</div>
                </div>
            </div>
        );
    };

    return (
        <>
            {fetchStatus === 'loading' && <h1>Loading...</h1>}
            {fetchStatus === 'error' && <h1>Error...</h1>}
            {fetchStatus === 'confirmed' && <View />}
        </>
    );
};

export default HeadlineNews;
