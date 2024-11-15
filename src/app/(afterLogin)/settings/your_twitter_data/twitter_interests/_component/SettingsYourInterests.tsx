'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';

export default function SettingsYourInterests() {
  const interests: ICheckBox[] = [
    { id: 0, title: '$BAC', defaultValue: true },
    { id: 1, title: '$C', defaultValue: true },
    { id: 2, title: '$NFLX', defaultValue: true },
    { id: 3, title: 'Adin Ross', defaultValue: true },
    { id: 4, title: 'Agatha All Along', defaultValue: true },
    { id: 5, title: 'American football', defaultValue: true },
    { id: 6, title: 'Angel Reese', defaultValue: true },
    { id: 7, title: 'Animation studios', defaultValue: true },
    { id: 8, title: 'Anime', defaultValue: true },
    { id: 9, title: 'Argentina politics', defaultValue: true },
    { id: 10, title: 'Athletic apparel', defaultValue: true },
    { id: 11, title: 'Authors', defaultValue: true },
    { id: 12, title: 'Bank of America', defaultValue: true },
    { id: 13, title: 'Baseball', defaultValue: true },
    { id: 14, title: 'Basketball', defaultValue: true },
    { id: 15, title: 'Bloomberg', defaultValue: true },
    { id: 16, title: 'Business &amp; finance', defaultValue: true },
    { id: 17, title: 'Business &amp; finance news', defaultValue: true },
    { id: 18, title: 'Business personalities', defaultValue: true },
    { id: 19, title: 'Carat', defaultValue: true },
    { id: 20, title: 'Cartoon Network', defaultValue: true },
    { id: 21, title: 'Celebrities', defaultValue: true },
    { id: 22, title: 'Central Banks', defaultValue: true },
    { id: 23, title: 'Chanel', defaultValue: true },
    { id: 24, title: 'Charles Schwab', defaultValue: true },
    { id: 25, title: 'Chelsea FC', defaultValue: true },
    { id: 26, title: 'China political issues', defaultValue: true },
    { id: 27, title: 'China politics', defaultValue: true },
    { id: 28, title: 'Citi', defaultValue: true },
    { id: 29, title: 'Cole Palmer', defaultValue: true },
    { id: 30, title: 'College Basketball', defaultValue: true },
    { id: 31, title: 'Combat sports', defaultValue: true },
    { id: 32, title: 'Comerica', defaultValue: true },
    { id: 33, title: 'Competitive games', defaultValue: true },
    { id: 34, title: 'Cricket', defaultValue: true },
    { id: 35, title: 'DJ Akademiks', defaultValue: true },
    { id: 36, title: 'Dating Apps', defaultValue: true },
    { id: 37, title: 'Day6', defaultValue: true },
    { id: 38, title: 'Designer fashion', defaultValue: true },
    { id: 39, title: 'Digital asset industry', defaultValue: true },
    {
      id: 40,
      title: 'Digital assets &amp; cryptocurrency',
      defaultValue: true,
    },
    { id: 41, title: 'Digital creators', defaultValue: true },
    {
      id: 42,
      title: 'Doctor Strange in the Multiverse of Madness',
      defaultValue: true,
    },
    { id: 43, title: 'Dragon Ball', defaultValue: true },
    { id: 44, title: 'Elon Musk', defaultValue: true },
    { id: 45, title: 'Emma Stone', defaultValue: true },
    { id: 46, title: 'Entertainment', defaultValue: true },
    { id: 47, title: 'Entertainment franchises', defaultValue: true },
    { id: 48, title: 'Famous wrestlers', defaultValue: true },
    { id: 49, title: 'Fashion', defaultValue: true },
    { id: 50, title: 'Federal Reserve', defaultValue: true },
    { id: 51, title: 'Free-to-play games', defaultValue: true },
    { id: 52, title: 'Gaming', defaultValue: true },
    { id: 53, title: 'Gaming content creators', defaultValue: true },
    { id: 54, title: 'Glenn Maxwell', defaultValue: true },
    { id: 55, title: 'Goldman Sachs', defaultValue: true },
    { id: 56, title: 'Google', defaultValue: true },
    { id: 57, title: 'Google brand conversation', defaultValue: true },
    { id: 58, title: 'Government institutions', defaultValue: true },
    { id: 59, title: 'Hip hop', defaultValue: true },
    { id: 60, title: 'House of the Dragon', defaultValue: true },
    { id: 61, title: 'Howard Stern', defaultValue: true },
    { id: 62, title: 'IShowSpeed', defaultValue: true },
    { id: 63, title: 'ITZY', defaultValue: true },
    { id: 64, title: 'Investing', defaultValue: true },
    { id: 65, title: 'Javier Milei', defaultValue: true },
    { id: 66, title: 'John Cena', defaultValue: true },
    { id: 67, title: 'Johnson &amp; Johnson', defaultValue: true },
    { id: 68, title: 'Jourdan Lewis', defaultValue: true },
    { id: 69, title: 'K-pop', defaultValue: true },
    { id: 70, title: 'Katy Perry', defaultValue: true },
    { id: 71, title: 'KatyCats', defaultValue: true },
    { id: 72, title: 'Kevin De Bruyne', defaultValue: true },
    { id: 73, title: 'Korean actors', defaultValue: true },
    { id: 74, title: 'Loans', defaultValue: true },
    { id: 75, title: 'MLB Baseball', defaultValue: true },
    { id: 76, title: 'MLB players', defaultValue: true },
    { id: 77, title: 'Manchester City', defaultValue: true },
    { id: 78, title: 'Marvel Studios', defaultValue: true },
    { id: 79, title: 'Marvel Universe', defaultValue: true },
    { id: 80, title: "McDonald's", defaultValue: true },
    { id: 81, title: 'Millie Bobby Brown', defaultValue: true },
    { id: 82, title: 'Movies &amp; TV', defaultValue: true },
    { id: 83, title: 'Music', defaultValue: true },
    { id: 84, title: 'Music', defaultValue: true },
    { id: 85, title: 'NASA', defaultValue: true },
    { id: 86, title: 'NBA Basketball', defaultValue: true },
    { id: 87, title: "NCAA Women's Basketball", defaultValue: true },
    { id: 88, title: 'NCT', defaultValue: true },
    { id: 89, title: 'NCT Dream', defaultValue: true },
    { id: 90, title: 'NFL players', defaultValue: true },
    { id: 91, title: 'NFTs', defaultValue: true },
    { id: 92, title: 'Nam JooHyuk', defaultValue: true },
    { id: 93, title: 'Netflix', defaultValue: true },
    { id: 94, title: 'New Balance', defaultValue: true },
    { id: 95, title: 'NewJeans', defaultValue: true },
    { id: 96, title: 'NewJeans', defaultValue: true },
    { id: 97, title: 'News', defaultValue: true },
    { id: 98, title: 'News outlets', defaultValue: true },
    { id: 99, title: 'Nigeria Olympic Team', defaultValue: true },
    { id: 100, title: 'Ongoing news stories', defaultValue: true },
    { id: 101, title: 'PNC Financial Services', defaultValue: true },
    { id: 102, title: 'Patrick Mahomes', defaultValue: true },
    { id: 103, title: 'Pokémon', defaultValue: true },
    { id: 104, title: 'Political figures', defaultValue: true },
    { id: 105, title: 'Political issues', defaultValue: true },
    { id: 106, title: 'Politics', defaultValue: true },
    { id: 107, title: 'Pop', defaultValue: true },
    { id: 108, title: 'Pop rock', defaultValue: true },
    { id: 109, title: 'Progressive Corporation', defaultValue: true },
    { id: 110, title: 'Rap', defaultValue: true },
    { id: 111, title: 'Retired life', defaultValue: true },
    { id: 112, title: 'S&amp;P 500', defaultValue: true },
    { id: 113, title: 'Sci-fi &amp; fantasy', defaultValue: true },
    { id: 114, title: 'Sci-fi &amp; fantasy TV', defaultValue: true },
    { id: 115, title: 'Science', defaultValue: true },
    { id: 116, title: 'Shohei Ohtani', defaultValue: true },
    { id: 117, title: 'Shooting games', defaultValue: true },
    { id: 118, title: 'Soccer', defaultValue: true },
    { id: 119, title: 'Social media', defaultValue: true },
    { id: 120, title: 'Solar System', defaultValue: true },
    { id: 121, title: 'Space', defaultValue: true },
    {
      id: 122,
      title: 'Space agencies &amp; companies',
      defaultValue: true,
    },
    { id: 123, title: 'Spider-Man', defaultValue: true },
    { id: 124, title: 'Sports', defaultValue: true },
    { id: 125, title: 'State Street', defaultValue: true },
    { id: 126, title: 'Stocks &amp; indices', defaultValue: true },
    { id: 127, title: 'TAEIL (NCT)', defaultValue: true },
    { id: 128, title: 'Tech personalities', defaultValue: true },
    { id: 129, title: 'Technology', defaultValue: true },
    { id: 130, title: 'Television', defaultValue: true },
    { id: 131, title: 'The Undertaker', defaultValue: true },
    { id: 132, title: 'The Wall Street Journal', defaultValue: true },
    { id: 133, title: 'Tinder', defaultValue: true },
    { id: 134, title: 'Twitch streamers', defaultValue: true },
    { id: 135, title: 'United States politics', defaultValue: true },
    { id: 136, title: 'UnitedHealthcare', defaultValue: true },
    { id: 137, title: 'VALORANT', defaultValue: true },
    { id: 138, title: 'Video games', defaultValue: true },
    { id: 139, title: 'WWE', defaultValue: true },
    { id: 140, title: 'Walgreens Boots Alliance', defaultValue: true },
    { id: 141, title: 'WandaVision', defaultValue: true },
    { id: 142, title: 'Wandavision', defaultValue: true },
    { id: 143, title: 'Wrestling', defaultValue: true },
    { id: 144, title: 'X', defaultValue: true },
    { id: 145, title: 'X - the everything app', defaultValue: true },
    { id: 146, title: 'YouTubers', defaultValue: true },
    { id: 147, title: 'Zach Edey', defaultValue: true },
  ];
  return (
    <div>
      {interests.map((v) => (
        <div className={utils.p_basic}>
          <IdentifierCheckBox title={v.title} defaultValue={v.defaultValue} />
        </div>
      ))}
    </div>
  );
}
