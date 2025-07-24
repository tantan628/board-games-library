import { Game } from '../types/Game'

interface Props {
  games: Game[]
}

const GameList = ({ games }: Props) => (
  <ul>
    {games.map(game => (
      <li key={game.id} className="flex items-start mb-4">
        {game.image && (
          <img
            src={game.image}
            alt={game.name}
            className="w-16 h-16 object-cover mr-4"
          />
        )}
        <div>
          <div className="font-semibold">
            {game.name} {game.yearpublished && `(${game.yearpublished})`}
          </div>
          {game.minage && (
            <div className="text-sm text-gray-600">Age: {game.minage}+</div>
          )}
          {game.minplayers && game.maxplayers && (
            <div className="text-sm text-gray-600">
              Players: {game.minplayers}-{game.maxplayers}
            </div>
          )}
          {game.categories && game.categories.length > 0 && (
            <div className="text-sm text-gray-600">
              Genres: {game.categories.join(', ')}
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
)

export default GameList
