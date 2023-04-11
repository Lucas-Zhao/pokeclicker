/*
To update this type when adding multiple new pokemon:

In 'PokemonList.ts', change the type of `PokemonListData -> name` to `string` and add your new pokemon.

Add ` = string` to `export type PokemonNameType` on this file.

Open the game, and run the following code in the browser console:

copy(`export type PokemonNameType
    = ${pokemonList.map(p => `'${p.name.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace everything in this file (except for this comment) with what was copied.

Change the type of `PokemonListData -> name` back to `PokemonNameType`.
Remove ` = string` from `export type PokemonNameType`.
*/

export type PokemonNameType
    = 'Bulbasaur'
    | 'Bulbasaur (Clone)'
    | 'Spooky Bulbasaur'
    | 'Bulbasaur (Rose)'
    | 'Ivysaur'
    | 'Ivysaur (Clone)'
    | 'Spooky Ivysaur'
    | 'Ivysaur (Rose)'
    | 'Venusaur'
    | 'Mega Venusaur'
    | 'Gigantamax Venusaur'
    | 'Venusaur (Clone)'
    | 'Spooky Venusaur'
    | 'Venusaur (Rose)'
    | 'Charmander'
    | 'Charmander (Clone)'
    | 'Charmeleon'
    | 'Charmeleon (Clone)'
    | 'Charizard'
    | 'Mega Charizard X'
    | 'Mega Charizard Y'
    | 'Gigantamax Charizard'
    | 'Charizard (Clone)'
    | 'Squirtle'
    | 'Squirtle (Clone)'
    | 'Wartortle'
    | 'Wartortle (Clone)'
    | 'Blastoise'
    | 'Mega Blastoise'
    | 'Gigantamax Blastoise'
    | 'Blastoise (Clone)'
    | 'Caterpie'
    | 'Pinkan Caterpie'
    | 'Metapod'
    | 'Butterfree'
    | 'Gigantamax Butterfree'
    | 'Valencian Butterfree'
    | 'Pink Butterfree'
    | 'Ash\'s Butterfree'
    | 'Weedle'
    | 'Pinkan Weedle'
    | 'Kakuna'
    | 'Beedrill'
    | 'Mega Beedrill'
    | 'Pidgey'
    | 'Pinkan Pidgey'
    | 'Pidgeotto'
    | 'Pinkan Pidgeotto'
    | 'Pidgeot'
    | 'Mega Pidgeot'
    | 'Rattata'
    | 'Alolan Rattata'
    | 'Pinkan Rattata'
    | 'Raticate'
    | 'Alolan Raticate'
    | 'Totem Raticate'
    | 'Valencian Raticate'
    | 'Spearow'
    | 'Red Spearow'
    | 'Fearow'
    | 'Ekans'
    | 'Arbok'
    | 'Pinkan Arbok'
    | 'Pikachu'
    | 'Pikachu (Original Cap)'
    | 'Pikachu (Hoenn Cap)'
    | 'Pikachu (Sinnoh Cap)'
    | 'Pikachu (Unova Cap)'
    | 'Pikachu (Kalos Cap)'
    | 'Pikachu (Alola Cap)'
    | 'Pikachu (World Cap)'
    | 'Pikachu (Partner Cap)'
    | 'Gigantamax Pikachu'
    | 'Flying Pikachu'
    | 'Surfing Pikachu'
    | 'Pikachu (Gengar)'
    | 'Let\'s Go Pikachu'
    | 'Pinkan Pikachu'
    | 'Detective Pikachu'
    | 'Raichu'
    | 'Alolan Raichu'
    | 'Detective Raichu'
    | 'Sandshrew'
    | 'Alolan Sandshrew'
    | 'Sandslash'
    | 'Alolan Sandslash'
    | 'Nidoran(F)'
    | 'Pinkan Nidoran(F)'
    | 'Nidorina'
    | 'Nidoqueen'
    | 'Nidoran(M)'
    | 'Pinkan Nidoran(M)'
    | 'Nidorino'
    | 'Nidoking'
    | 'Pinkan Nidoking'
    | 'Clefairy'
    | 'Clefable'
    | 'Vulpix'
    | 'Alolan Vulpix'
    | 'Ninetales'
    | 'Alolan Ninetales'
    | 'Jigglypuff'
    | 'Wigglytuff'
    | 'Zubat'
    | 'Golbat'
    | 'Oddish'
    | 'Pinkan Oddish'
    | 'Gloom'
    | 'Vileplume'
    | 'Valencian Vileplume'
    | 'Pinkan Vileplume'
    | 'Paras'
    | 'Valencian Paras'
    | 'Pinkan Paras'
    | 'Parasect'
    | 'Venonat'
    | 'Pinkan Venonat'
    | 'Venomoth'
    | 'Diglett'
    | 'Alolan Diglett'
    | 'Pinkan Diglett'
    | 'Dugtrio'
    | 'Alolan Dugtrio'
    | 'Meowth'
    | 'Gigantamax Meowth'
    | 'Alolan Meowth'
    | 'Galarian Meowth'
    | 'Persian'
    | 'Alolan Persian'
    | 'Psyduck'
    | 'Golduck'
    | 'Mankey'
    | 'Pinkan Mankey'
    | 'Primeape'
    | 'Pinkan Primeape'
    | 'Growlithe'
    | 'Arcanine'
    | 'Poliwag'
    | 'Poliwhirl'
    | 'Pinkan Poliwhirl'
    | 'Poliwrath'
    | 'Abra'
    | 'Kadabra'
    | 'Alakazam'
    | 'Mega Alakazam'
    | 'Machop'
    | 'Machoke'
    | 'Machamp'
    | 'Gigantamax Machamp'
    | 'Bellsprout'
    | 'Pinkan Bellsprout'
    | 'Weepinbell'
    | 'Valencian Weepinbell'
    | 'Victreebel'
    | 'Tentacool'
    | 'Tentacruel'
    | 'Geodude'
    | 'Alolan Geodude'
    | 'Pinkan Geodude'
    | 'Graveler'
    | 'Alolan Graveler'
    | 'Golem'
    | 'Alolan Golem'
    | 'Ponyta'
    | 'Galarian Ponyta'
    | 'Rapidash'
    | 'Galarian Rapidash'
    | 'Slowpoke'
    | 'Galarian Slowpoke'
    | 'Slowbro'
    | 'Mega Slowbro'
    | 'Galarian Slowbro'
    | 'Magnemite'
    | 'Magneton'
    | 'Farfetch\'d'
    | 'Galarian Farfetch\'d'
    | 'Doduo'
    | 'Dodrio'
    | 'Pinkan Dodrio'
    | 'Seel'
    | 'Dewgong'
    | 'Grimer'
    | 'Alolan Grimer'
    | 'Muk'
    | 'Alolan Muk'
    | 'Shellder'
    | 'Cloyster'
    | 'Gastly'
    | 'Haunter'
    | 'Gengar'
    | 'Mega Gengar'
    | 'Gigantamax Gengar'
    | 'Onix'
    | 'Crystal Onix'
    | 'Drowzee'
    | 'Hypno'
    | 'Krabby'
    | 'Kingler'
    | 'Gigantamax Kingler'
    | 'Voltorb'
    | 'Electrode'
    | 'Exeggcute'
    | 'Exeggutor'
    | 'Alolan Exeggutor'
    | 'Pinkan Exeggutor'
    | 'Cubone'
    | 'Marowak'
    | 'Alolan Marowak'
    | 'Totem Marowak'
    | 'Hitmonlee'
    | 'Hitmonchan'
    | 'Lickitung'
    | 'Koffing'
    | 'Weezing'
    | 'Galarian Weezing'
    | 'Pinkan Weezing'
    | 'Rhyhorn'
    | 'Pinkan Rhyhorn'
    | 'Rhydon'
    | 'Pinkan Rhydon'
    | 'Chansey'
    | 'Charity Chansey'
    | 'Tangela'
    | 'Kangaskhan'
    | 'Mega Kangaskhan'
    | 'Horsea'
    | 'Seadra'
    | 'Goldeen'
    | 'Seaking'
    | 'Staryu'
    | 'Starmie'
    | 'Mr. Mime'
    | 'Galarian Mr. Mime'
    | 'Scyther'
    | 'Pinkan Scyther'
    | 'Jynx'
    | 'Electabuzz'
    | 'Pinkan Electabuzz'
    | 'Magmar'
    | 'Pinsir'
    | 'Mega Pinsir'
    | 'Tauros'
    | 'Magikarp'
    | 'Magikarp Skelly'
    | 'Magikarp Calico (Orange, White)'
    | 'Magikarp Calico (Orange, White, Black)'
    | 'Magikarp Calico (White, Orange)'
    | 'Magikarp Calico (Orange, Gold)'
    | 'Magikarp Orange Two-Tone'
    | 'Magikarp Orange Orca'
    | 'Magikarp Orange Dapples'
    | 'Magikarp Pink Two-Tone'
    | 'Magikarp Pink Orca'
    | 'Magikarp Pink Dapples'
    | 'Magikarp Grey Bubbles'
    | 'Magikarp Grey Diamonds'
    | 'Magikarp Grey Patches'
    | 'Magikarp Purple Bubbles'
    | 'Magikarp Purple Diamonds'
    | 'Magikarp Purple Patches'
    | 'Magikarp Apricot Tiger'
    | 'Magikarp Apricot Zebra'
    | 'Magikarp Apricot Stripes'
    | 'Magikarp Brown Tiger'
    | 'Magikarp Brown Zebra'
    | 'Magikarp Brown Stripes'
    | 'Magikarp Orange Forehead'
    | 'Magikarp Orange Mask'
    | 'Magikarp Black Forehead'
    | 'Magikarp Black Mask'
    | 'Magikarp Blue Raindrops'
    | 'Magikarp Saucy Blue'
    | 'Magikarp Violet Raindrops'
    | 'Magikarp Saucy Violet'
    | 'Magikarp (Feebas)'
    | 'Gyarados'
    | 'Mega Gyarados'
    | 'Lapras'
    | 'Gigantamax Lapras'
    | 'Ditto'
    | 'Eevee'
    | 'Gigantamax Eevee'
    | 'Let\'s Go Eevee'
    | 'Vaporeon'
    | 'Jolteon'
    | 'Flareon'
    | 'Porygon'
    | 'Omanyte'
    | 'Omastar'
    | 'Kabuto'
    | 'Kabutops'
    | 'Aerodactyl'
    | 'Mega Aerodactyl'
    | 'Snorlax'
    | 'Gigantamax Snorlax'
    | 'Santa Snorlax'
    | 'Articuno'
    | 'Galarian Articuno'
    | 'Zapdos'
    | 'Galarian Zapdos'
    | 'Moltres'
    | 'Galarian Moltres'
    | 'Dratini'
    | 'Dragonair'
    | 'Dragonite'
    | 'Mewtwo'
    | 'Mega Mewtwo X'
    | 'Mega Mewtwo Y'
    | 'Armored Mewtwo'
    | 'Mew'
    | 'Chikorita'
    | 'Bayleef'
    | 'Meganium'
    | 'Cyndaquil'
    | 'Quilava'
    | 'Typhlosion'
    | 'Totodile'
    | 'Croconaw'
    | 'Feraligatr'
    | 'Sentret'
    | 'Furret'
    | 'Hoothoot'
    | 'Noctowl'
    | 'Ledyba'
    | 'Ledian'
    | 'Spinarak'
    | 'Ariados'
    | 'Crobat'
    | 'Chinchou'
    | 'Lanturn'
    | 'Pichu'
    | 'Spiky-eared Pichu'
    | 'Cleffa'
    | 'Igglybuff'
    | 'Togepi'
    | 'Spooky Togepi'
    | 'Surprise Togepi'
    | 'Togetic'
    | 'Spooky Togetic'
    | 'Natu'
    | 'Xatu'
    | 'Mareep'
    | 'Flaaffy'
    | 'Ampharos'
    | 'Mega Ampharos'
    | 'Bellossom'
    | 'Marill'
    | 'Azumarill'
    | 'Sudowoodo'
    | 'Politoed'
    | 'Hoppip'
    | 'Hoppip (Chimecho)'
    | 'Skiploom'
    | 'Jumpluff'
    | 'Aipom'
    | 'Sunkern'
    | 'Sunflora'
    | 'Yanma'
    | 'Wooper'
    | 'Quagsire'
    | 'Espeon'
    | 'Umbreon'
    | 'Murkrow'
    | 'Slowking'
    | 'Galarian Slowking'
    | 'Misdreavus'
    | 'Unown (A)'
    | 'Unown (B)'
    | 'Unown (C)'
    | 'Unown (D)'
    | 'Unown (E)'
    | 'Unown (F)'
    | 'Unown (G)'
    | 'Unown (H)'
    | 'Unown (I)'
    | 'Unown (J)'
    | 'Unown (K)'
    | 'Unown (L)'
    | 'Unown (M)'
    | 'Unown (N)'
    | 'Unown (O)'
    | 'Unown (P)'
    | 'Unown (Q)'
    | 'Unown (R)'
    | 'Unown (S)'
    | 'Unown (T)'
    | 'Unown (U)'
    | 'Unown (V)'
    | 'Unown (W)'
    | 'Unown (X)'
    | 'Unown (Y)'
    | 'Unown (Z)'
    | 'Unown (!)'
    | 'Unown (?)'
    | 'Wobbuffet'
    | 'Girafarig'
    | 'Pineco'
    | 'Forretress'
    | 'Dunsparce'
    | 'Gligar'
    | 'Steelix'
    | 'Mega Steelix'
    | 'Crystal Steelix'
    | 'Snubbull'
    | 'Granbull'
    | 'Qwilfish'
    | 'Scizor'
    | 'Mega Scizor'
    | 'Shuckle'
    | 'Heracross'
    | 'Mega Heracross'
    | 'Sneasel'
    | 'Teddiursa'
    | 'Ursaring'
    | 'Slugma'
    | 'Magcargo'
    | 'Swinub'
    | 'Piloswine'
    | 'Corsola'
    | 'Galarian Corsola'
    | 'Remoraid'
    | 'Octillery'
    | 'Delibird'
    | 'Mantine'
    | 'Skarmory'
    | 'Houndour'
    | 'Houndoom'
    | 'Mega Houndoom'
    | 'Kingdra'
    | 'Phanpy'
    | 'Donphan'
    | 'Porygon2'
    | 'Stantler'
    | 'Smeargle'
    | 'Tyrogue'
    | 'Hitmontop'
    | 'Smoochum'
    | 'Elekid'
    | 'Magby'
    | 'Miltank'
    | 'Blissey'
    | 'Blessing Blissey'
    | 'Raikou'
    | 'Entei'
    | 'Suicune'
    | 'Larvitar'
    | 'Pupitar'
    | 'Tyranitar'
    | 'Mega Tyranitar'
    | 'Lugia'
    | 'XD001'
    | 'Ho-Oh'
    | 'Celebi'
    | 'Grinch Celebi'
    | 'Flowering Celebi'
    | 'Treecko'
    | 'Grovyle'
    | 'Sceptile'
    | 'Mega Sceptile'
    | 'Torchic'
    | 'Combusken'
    | 'Blaziken'
    | 'Mega Blaziken'
    | 'Mudkip'
    | 'Marshtomp'
    | 'Swampert'
    | 'Mega Swampert'
    | 'Poochyena'
    | 'Mightyena'
    | 'Zigzagoon'
    | 'Galarian Zigzagoon'
    | 'Linoone'
    | 'Galarian Linoone'
    | 'Wurmple'
    | 'Silcoon'
    | 'Beautifly'
    | 'Cascoon'
    | 'Dustox'
    | 'Lotad'
    | 'Lombre'
    | 'Ludicolo'
    | 'Seedot'
    | 'Nuzleaf'
    | 'Shiftry'
    | 'Taillow'
    | 'Swellow'
    | 'Wingull'
    | 'Pelipper'
    | 'Ralts'
    | 'Kirlia'
    | 'Gardevoir'
    | 'Mega Gardevoir'
    | 'Surskit'
    | 'Masquerain'
    | 'Shroomish'
    | 'Breloom'
    | 'Slakoth'
    | 'Vigoroth'
    | 'Slaking'
    | 'Nincada'
    | 'Ninjask'
    | 'Shedinja'
    | 'Whismur'
    | 'Loudred'
    | 'Exploud'
    | 'Makuhita'
    | 'Hariyama'
    | 'Azurill'
    | 'Nosepass'
    | 'Skitty'
    | 'Delcatty'
    | 'Sableye'
    | 'Mega Sableye'
    | 'Mawile'
    | 'Mega Mawile'
    | 'Aron'
    | 'Lairon'
    | 'Aggron'
    | 'Mega Aggron'
    | 'Meditite'
    | 'Medicham'
    | 'Mega Medicham'
    | 'Electrike'
    | 'Manectric'
    | 'Mega Manectric'
    | 'Plusle'
    | 'Minun'
    | 'Volbeat'
    | 'Illumise'
    | 'Roselia'
    | 'Gulpin'
    | 'Swalot'
    | 'Carvanha'
    | 'Sharpedo'
    | 'Mega Sharpedo'
    | 'Wailmer'
    | 'Wailord'
    | 'Numel'
    | 'Camerupt'
    | 'Mega Camerupt'
    | 'Torkoal'
    | 'Spoink'
    | 'Grumpig'
    | 'Spinda'
    | 'Trapinch'
    | 'Vibrava'
    | 'Flygon'
    | 'Cacnea'
    | 'Cacturne'
    | 'Swablu'
    | 'Altaria'
    | 'Mega Altaria'
    | 'Zangoose'
    | 'Seviper'
    | 'Lunatone'
    | 'Solrock'
    | 'Barboach'
    | 'Whiscash'
    | 'Corphish'
    | 'Crawdaunt'
    | 'Baltoy'
    | 'Claydol'
    | 'Lileep'
    | 'Cradily'
    | 'Anorith'
    | 'Armaldo'
    | 'Feebas'
    | 'Milotic'
    | 'Castform'
    | 'Castform (Sunny)'
    | 'Castform (Rainy)'
    | 'Castform (Snowy)'
    | 'Kecleon'
    | 'Shuppet'
    | 'Banette'
    | 'Mega Banette'
    | 'Duskull'
    | 'Dusclops'
    | 'Tropius'
    | 'Chimecho'
    | 'Absol'
    | 'Mega Absol'
    | 'Wynaut'
    | 'Snorunt'
    | 'Glalie'
    | 'Mega Glalie'
    | 'Spheal'
    | 'Sealeo'
    | 'Walrein'
    | 'Clamperl'
    | 'Huntail'
    | 'Gorebyss'
    | 'Relicanth'
    | 'Luvdisc'
    | 'Bagon'
    | 'Shelgon'
    | 'Salamence'
    | 'Mega Salamence'
    | 'Beldum'
    | 'Metang'
    | 'Metagross'
    | 'Mega Metagross'
    | 'Regirock'
    | 'Regice'
    | 'Registeel'
    | 'Latias'
    | 'Mega Latias'
    | 'Latios'
    | 'Mega Latios'
    | 'Kyogre'
    | 'Primal Kyogre'
    | 'Groudon'
    | 'Primal Groudon'
    | 'Meta Groudon'
    | 'Rayquaza'
    | 'Mega Rayquaza'
    | 'Jirachi'
    | 'Deoxys'
    | 'Deoxys (Attack)'
    | 'Deoxys (Defense)'
    | 'Deoxys (Speed)'
    | 'Turtwig'
    | 'Grotle'
    | 'Torterra'
    | 'Chimchar'
    | 'Monferno'
    | 'Infernape'
    | 'Piplup'
    | 'Prinplup'
    | 'Empoleon'
    | 'Starly'
    | 'Staravia'
    | 'Staraptor'
    | 'Bidoof'
    | 'Bibarel'
    | 'Kricketot'
    | 'Kricketune'
    | 'Shinx'
    | 'Luxio'
    | 'Luxray'
    | 'Budew'
    | 'Roserade'
    | 'Cranidos'
    | 'Rampardos'
    | 'Shieldon'
    | 'Bastiodon'
    | 'Burmy (Plant)'
    | 'Burmy (Sand)'
    | 'Burmy (Trash)'
    | 'Wormadam (Plant)'
    | 'Wormadam (Sand)'
    | 'Wormadam (Trash)'
    | 'Mothim'
    | 'Combee'
    | 'Vespiquen'
    | 'Pachirisu'
    | 'Buizel'
    | 'Floatzel'
    | 'Cherubi'
    | 'Cherrim (Overcast)'
    | 'Cherrim (Sunshine)'
    | 'Shellos (West)'
    | 'Shellos (East)'
    | 'Gastrodon (West)'
    | 'Gastrodon (East)'
    | 'Ambipom'
    | 'Drifloon'
    | 'Drifblim'
    | 'Buneary'
    | 'Lopunny'
    | 'Mega Lopunny'
    | 'Mismagius'
    | 'Honchkrow'
    | 'Glameow'
    | 'Purugly'
    | 'Chingling'
    | 'Stunky'
    | 'Skuntank'
    | 'Bronzor'
    | 'Bronzong'
    | 'Bonsly'
    | 'Mime Jr.'
    | 'Happiny'
    | 'Handout Happiny'
    | 'Chatot'
    | 'Spiritomb'
    | 'Gible'
    | 'Gabite'
    | 'Garchomp'
    | 'Mega Garchomp'
    | 'Munchlax'
    | 'Elf Munchlax'
    | 'Riolu'
    | 'Lucario'
    | 'Mega Lucario'
    | 'Hippopotas'
    | 'Hippowdon'
    | 'Skorupi'
    | 'Drapion'
    | 'Croagunk'
    | 'Toxicroak'
    | 'Carnivine'
    | 'Finneon'
    | 'Lumineon'
    | 'Mantyke'
    | 'Snover'
    | 'Abomasnow'
    | 'Mega Abomasnow'
    | 'Weavile'
    | 'Magnezone'
    | 'Lickilicky'
    | 'Rhyperior'
    | 'Tangrowth'
    | 'Electivire'
    | 'Magmortar'
    | 'Togekiss'
    | 'Spooky Togekiss'
    | 'Yanmega'
    | 'Leafeon'
    | 'Glaceon'
    | 'Gliscor'
    | 'Mamoswine'
    | 'Porygon-Z'
    | 'Gallade'
    | 'Mega Gallade'
    | 'Probopass'
    | 'Dusknoir'
    | 'Froslass'
    | 'Rotom'
    | 'Rotom (Heat)'
    | 'Rotom (Wash)'
    | 'Rotom (Frost)'
    | 'Rotom (Fan)'
    | 'Rotom (Mow)'
    | 'Rotom (Discord)'
    | 'Uxie'
    | 'Mesprit'
    | 'Azelf'
    | 'Dialga'
    | 'Palkia'
    | 'Heatran'
    | 'Regigigas'
    | 'Giratina (Altered)'
    | 'Giratina (Origin)'
    | 'Cresselia'
    | 'Phione'
    | 'Manaphy'
    | 'Darkrai'
    | 'Shaymin (Land)'
    | 'Shaymin (Sky)'
    | 'Arceus (Normal)'
    | 'Arceus (Fire)'
    | 'Arceus (Water)'
    | 'Arceus (Electric)'
    | 'Arceus (Grass)'
    | 'Arceus (Ice)'
    | 'Arceus (Fighting)'
    | 'Arceus (Poison)'
    | 'Arceus (Ground)'
    | 'Arceus (Flying)'
    | 'Arceus (Psychic)'
    | 'Arceus (Bug)'
    | 'Arceus (Rock)'
    | 'Arceus (Ghost)'
    | 'Arceus (Dragon)'
    | 'Arceus (Dark)'
    | 'Arceus (Steel)'
    | 'Arceus (Fairy)'
    | 'Victini'
    | 'Snivy'
    | 'Servine'
    | 'Serperior'
    | 'Tepig'
    | 'Pignite'
    | 'Emboar'
    | 'Oshawott'
    | 'Dewott'
    | 'Samurott'
    | 'Patrat'
    | 'Watchog'
    | 'Lillipup'
    | 'Herdier'
    | 'Stoutland'
    | 'Purrloin'
    | 'Liepard'
    | 'Pansage'
    | 'Simisage'
    | 'Pansear'
    | 'Simisear'
    | 'Panpour'
    | 'Simipour'
    | 'Munna'
    | 'Musharna'
    | 'Pidove'
    | 'Tranquill'
    | 'Unfezant'
    | 'Blitzle'
    | 'Zebstrika'
    | 'Roggenrola'
    | 'Boldore'
    | 'Gigalith'
    | 'Woobat'
    | 'Swoobat'
    | 'Drilbur'
    | 'Excadrill'
    | 'Audino'
    | 'Mega Audino'
    | 'Timburr'
    | 'Gurdurr'
    | 'Conkeldurr'
    | 'Tympole'
    | 'Palpitoad'
    | 'Seismitoad'
    | 'Throh'
    | 'Sawk'
    | 'Sewaddle'
    | 'Swadloon'
    | 'Leavanny'
    | 'Venipede'
    | 'Whirlipede'
    | 'Scolipede'
    | 'Cottonee'
    | 'Whimsicott'
    | 'Petilil'
    | 'Lilligant'
    | 'Basculin (Red-Striped)'
    | 'Basculin (Blue-Striped)'
    | 'Sandile'
    | 'Krokorok'
    | 'Krookodile'
    | 'Darumaka'
    | 'Galarian Darumaka'
    | 'Darmanitan'
    | 'Darmanitan (Zen)'
    | 'Galarian Darmanitan'
    | 'Galarian Darmanitan (Zen)'
    | 'Maractus'
    | 'Dwebble'
    | 'Crustle'
    | 'Scraggy'
    | 'Scrafty'
    | 'Sigilyph'
    | 'Yamask'
    | 'Galarian Yamask'
    | 'Cofagrigus'
    | 'Tirtouga'
    | 'Carracosta'
    | 'Archen'
    | 'Archeops'
    | 'Trubbish'
    | 'Garbodor'
    | 'Gigantamax Garbodor'
    | 'Zorua'
    | 'Zoroark'
    | 'Minccino'
    | 'Cinccino'
    | 'Gothita'
    | 'Gothorita'
    | 'Gothitelle'
    | 'Solosis'
    | 'Duosion'
    | 'Reuniclus'
    | 'Ducklett'
    | 'Swanna'
    | 'Vanillite'
    | 'Vanillish'
    | 'Vanilluxe'
    | 'Deerling (Spring)'
    | 'Deerling (Summer)'
    | 'Deerling (Autumn)'
    | 'Deerling (Winter)'
    | 'Sawsbuck (Spring)'
    | 'Sawsbuck (Summer)'
    | 'Sawsbuck (Autumn)'
    | 'Sawsbuck (Winter)'
    | 'Emolga'
    | 'Karrablast'
    | 'Escavalier'
    | 'Foongus'
    | 'Amoonguss'
    | 'Frillish'
    | 'Jellicent'
    | 'Alomomola'
    | 'Joltik'
    | 'Galvantula'
    | 'Ferroseed'
    | 'Ferrothorn'
    | 'Klink'
    | 'Klang'
    | 'Klinklang'
    | 'Tynamo'
    | 'Eelektrik'
    | 'Eelektross'
    | 'Elgyem'
    | 'Beheeyem'
    | 'Litwick'
    | 'Lampent'
    | 'Chandelure'
    | 'Axew'
    | 'Fraxure'
    | 'Haxorus'
    | 'Cubchoo'
    | 'Beartic'
    | 'Cryogonal'
    | 'Shelmet'
    | 'Accelgor'
    | 'Stunfisk'
    | 'Galarian Stunfisk'
    | 'Mienfoo'
    | 'Mienshao'
    | 'Druddigon'
    | 'Golett'
    | 'Golurk'
    | 'Pawniard'
    | 'Bisharp'
    | 'Bouffalant'
    | 'Rufflet'
    | 'Braviary'
    | 'Vullaby'
    | 'Mandibuzz'
    | 'Heatmor'
    | 'Durant'
    | 'Deino'
    | 'Zweilous'
    | 'Hydreigon'
    | 'Larvesta'
    | 'Volcarona'
    | 'Cobalion'
    | 'Terrakion'
    | 'Virizion'
    | 'Tornadus'
    | 'Tornadus (Therian)'
    | 'Thundurus'
    | 'Thundurus (Therian)'
    | 'Reshiram'
    | 'Zekrom'
    | 'Landorus'
    | 'Landorus (Therian)'
    | 'Kyurem'
    | 'Kyurem (White)'
    | 'Kyurem (Black)'
    | 'Keldeo'
    | 'Keldeo (Resolute)'
    | 'Meloetta (Aria)'
    | 'Meloetta (Pirouette)'
    | 'Genesect'
    | 'Chespin'
    | 'Quilladin'
    | 'Chesnaught'
    | 'Fennekin'
    | 'Braixen'
    | 'Delphox'
    | 'Froakie'
    | 'Frogadier'
    | 'Greninja'
    | 'Ash-Greninja'
    | 'Bunnelby'
    | 'Diggersby'
    | 'Fletchling'
    | 'Fletchinder'
    | 'Talonflame'
    | 'Scatterbug'
    | 'Spewpa'
    | 'Vivillon (Meadow)'
    | 'Vivillon (Icy Snow)'
    | 'Vivillon (Polar)'
    | 'Vivillon (Tundra)'
    | 'Vivillon (Continental)'
    | 'Vivillon (Garden)'
    | 'Vivillon (Elegant)'
    | 'Vivillon (Modern)'
    | 'Vivillon (Marine)'
    | 'Vivillon (Archipelago)'
    | 'Vivillon (High Plains)'
    | 'Vivillon (Sandstorm)'
    | 'Vivillon (River)'
    | 'Vivillon (Monsoon)'
    | 'Vivillon (Savanna)'
    | 'Vivillon (Sun)'
    | 'Vivillon (Ocean)'
    | 'Vivillon (Jungle)'
    | 'Vivillon (Poké Ball)'
    | 'Vivillon (Fancy)'
    | 'Litleo'
    | 'Pyroar'
    | 'Flabébé (Red)'
    | 'Flabébé (Yellow)'
    | 'Flabébé (Orange)'
    | 'Flabébé (Blue)'
    | 'Flabébé (White)'
    | 'Floette (Red)'
    | 'Floette (Yellow)'
    | 'Floette (Orange)'
    | 'Floette (Blue)'
    | 'Floette (White)'
    | 'Floette (Eternal)'
    | 'Florges (Red)'
    | 'Florges (Yellow)'
    | 'Florges (Orange)'
    | 'Florges (Blue)'
    | 'Florges (White)'
    | 'Skiddo'
    | 'Gogoat'
    | 'Pancham'
    | 'Pangoro'
    | 'Furfrou'
    | 'Furfrou (Heart)'
    | 'Furfrou (Star)'
    | 'Furfrou (Diamond)'
    | 'Furfrou (Debutante)'
    | 'Furfrou (Matron)'
    | 'Furfrou (Dandy)'
    | 'Furfrou (La Reine)'
    | 'Furfrou (Kabuki)'
    | 'Furfrou (Pharaoh)'
    | 'Espurr'
    | 'Meowstic'
    | 'Honedge'
    | 'Doublade'
    | 'Aegislash (Shield)'
    | 'Aegislash (Blade)'
    | 'Spritzee'
    | 'Aromatisse'
    | 'Swirlix'
    | 'Slurpuff'
    | 'Inkay'
    | 'Malamar'
    | 'Binacle'
    | 'Barbaracle'
    | 'Skrelp'
    | 'Dragalge'
    | 'Clauncher'
    | 'Clawitzer'
    | 'Helioptile'
    | 'Heliolisk'
    | 'Tyrunt'
    | 'Tyrantrum'
    | 'Amaura'
    | 'Aurorus'
    | 'Sylveon'
    | 'Hawlucha'
    | 'Dedenne'
    | 'Carbink'
    | 'Goomy'
    | 'Sliggoo'
    | 'Goodra'
    | 'Klefki'
    | 'Phantump'
    | 'Trevenant'
    | 'Pumpkaboo (Average)'
    | 'Pumpkaboo (Small)'
    | 'Pumpkaboo (Large)'
    | 'Pumpkaboo (Super Size)'
    | 'Gourgeist (Average)'
    | 'Gourgeist (Small)'
    | 'Gourgeist (Large)'
    | 'Gourgeist (Super Size)'
    | 'Bergmite'
    | 'Avalugg'
    | 'Noibat'
    | 'Noivern'
    | 'Xerneas'
    | 'Yveltal'
    | 'Zygarde'
    | 'Diancie'
    | 'Mega Diancie'
    | 'Hoopa'
    | 'Volcanion'
    | 'Rowlet'
    | 'Dartrix'
    | 'Decidueye'
    | 'Litten'
    | 'Torracat'
    | 'Incineroar'
    | 'Popplio'
    | 'Brionne'
    | 'Primarina'
    | 'Pikipek'
    | 'Trumbeak'
    | 'Toucannon'
    | 'Yungoos'
    | 'Gumshoos'
    | 'Totem Gumshoos'
    | 'Grubbin'
    | 'Charjabug'
    | 'Vikavolt'
    | 'Totem Vikavolt'
    | 'Crabrawler'
    | 'Crabominable'
    | 'Oricorio (Baile)'
    | 'Oricorio (Pom-Pom)'
    | 'Oricorio (Pa\'u)'
    | 'Oricorio (Sensu)'
    | 'Cutiefly'
    | 'Ribombee'
    | 'Totem Ribombee'
    | 'Rockruff'
    | 'Lycanroc (Midday)'
    | 'Lycanroc (Midnight)'
    | 'Lycanroc (Dusk)'
    | 'Wishiwashi (Solo)'
    | 'Wishiwashi (School)'
    | 'Totem Wishiwashi'
    | 'Mareanie'
    | 'Toxapex'
    | 'Mudbray'
    | 'Mudsdale'
    | 'Dewpider'
    | 'Araquanid'
    | 'Totem Araquanid'
    | 'Fomantis'
    | 'Lurantis'
    | 'Totem Lurantis'
    | 'Morelull'
    | 'Shiinotic'
    | 'Salandit'
    | 'Salazzle'
    | 'Totem Salazzle'
    | 'Stufful'
    | 'Bewear'
    | 'Bounsweet'
    | 'Steenee'
    | 'Tsareena'
    | 'Comfey'
    | 'Oranguru'
    | 'Passimian'
    | 'Wimpod'
    | 'Golisopod'
    | 'Sandygast'
    | 'Palossand'
    | 'Pyukumuku'
    | 'Type: Null'
    | 'Silvally (Normal)'
    | 'Silvally (Fire)'
    | 'Silvally (Water)'
    | 'Silvally (Electric)'
    | 'Silvally (Grass)'
    | 'Silvally (Ice)'
    | 'Silvally (Fighting)'
    | 'Silvally (Poison)'
    | 'Silvally (Ground)'
    | 'Silvally (Flying)'
    | 'Silvally (Psychic)'
    | 'Silvally (Bug)'
    | 'Silvally (Rock)'
    | 'Silvally (Ghost)'
    | 'Silvally (Dragon)'
    | 'Silvally (Dark)'
    | 'Silvally (Steel)'
    | 'Silvally (Fairy)'
    | 'Minior (Meteor)'
    | 'Minior (Red Core)'
    | 'Minior (Orange Core)'
    | 'Minior (Yellow Core)'
    | 'Minior (Green Core)'
    | 'Minior (Blue Core)'
    | 'Minior (Indigo Core)'
    | 'Minior (Violet Core)'
    | 'Komala'
    | 'Turtonator'
    | 'Togedemaru'
    | 'Totem Togedemaru'
    | 'Mimikyu'
    | 'Totem Mimikyu'
    | 'Bruxish'
    | 'Drampa'
    | 'Dhelmise'
    | 'Jangmo-o'
    | 'Hakamo-o'
    | 'Kommo-o'
    | 'Totem Kommo-o'
    | 'Tapu Koko'
    | 'Tapu Lele'
    | 'Tapu Bulu'
    | 'Tapu Fini'
    | 'Cosmog'
    | 'Cosmoem'
    | 'Solgaleo'
    | 'Solgaleo (Radiant Sun)'
    | 'Lunala'
    | 'Lunala (Full Moon)'
    | 'Nihilego'
    | 'Buzzwole'
    | 'Pheromosa'
    | 'Xurkitree'
    | 'Celesteela'
    | 'Kartana'
    | 'Guzzlord'
    | 'Necrozma'
    | 'Necrozma (Dusk Mane)'
    | 'Necrozma (Dawn Wings)'
    | 'Ultra Necrozma'
    | 'Magearna'
    | 'Magearna (Original Color)'
    | 'Marshadow'
    | 'Poipole'
    | 'Naganadel'
    | 'Stakataka'
    | 'Blacephalon'
    | 'Zeraora'
    | 'Meltan'
    | 'Melmetal'
    | 'Gigantamax Melmetal'
    | 'Grookey'
    | 'Thwackey'
    | 'Rillaboom'
    | 'Gigantamax Rillaboom'
    | 'Scorbunny'
    | 'Raboot'
    | 'Cinderace'
    | 'Gigantamax Cinderace'
    | 'Sobble'
    | 'Drizzile'
    | 'Inteleon'
    | 'Gigantamax Inteleon'
    | 'Skwovet'
    | 'Greedent'
    | 'Rookidee'
    | 'Corvisquire'
    | 'Corviknight'
    | 'Gigantamax Corviknight'
    | 'Blipbug'
    | 'Dottler'
    | 'Orbeetle'
    | 'Gigantamax Orbeetle'
    | 'Nickit'
    | 'Thievul'
    | 'Gossifleur'
    | 'Eldegoss'
    | 'Wooloo'
    | 'Dubwool'
    | 'Chewtle'
    | 'Drednaw'
    | 'Gigantamax Drednaw'
    | 'Yamper'
    | 'Boltund'
    | 'Rolycoly'
    | 'Carkol'
    | 'Coalossal'
    | 'Gigantamax Coalossal'
    | 'Applin'
    | 'Flapple'
    | 'Gigantamax Flapple'
    | 'Appletun'
    | 'Gigantamax Appletun'
    | 'Silicobra'
    | 'Sandaconda'
    | 'Gigantamax Sandaconda'
    | 'Cramorant'
    | 'Cramorant (Gulping)'
    | 'Cramorant (Gorging)'
    | 'Arrokuda'
    | 'Barraskewda'
    | 'Toxel'
    | 'Toxtricity (Amped)'
    | 'Toxtricity (Low Key)'
    | 'Gigantamax Toxtricity'
    | 'Sizzlipede'
    | 'Centiskorch'
    | 'Gigantamax Centiskorch'
    | 'Clobbopus'
    | 'Grapploct'
    | 'Sinistea'
    | 'Polteageist'
    | 'Hatenna'
    | 'Hattrem'
    | 'Hatterene'
    | 'Gigantamax Hatterene'
    | 'Impidimp'
    | 'Morgrem'
    | 'Grimmsnarl'
    | 'Gigantamax Grimmsnarl'
    | 'Obstagoon'
    | 'Perrserker'
    | 'Cursola'
    | 'Sirfetch\'d'
    | 'Mr. Rime'
    | 'Runerigus'
    | 'Milcery'
    | 'Milcery (Cheesy)'
    | 'Alcremie (Strawberry Vanilla)'
    | 'Alcremie (Strawberry Ruby Cream)'
    | 'Alcremie (Strawberry Caramel)'
    | 'Alcremie (Strawberry Ruby Swirl)'
    | 'Alcremie (Strawberry Matcha)'
    | 'Alcremie (Strawberry Salted)'
    | 'Alcremie (Strawberry Lemon)'
    | 'Alcremie (Strawberry Mint)'
    | 'Alcremie (Strawberry Rainbow)'
    | 'Alcremie (Berry Vanilla)'
    | 'Alcremie (Berry Ruby Cream)'
    | 'Alcremie (Berry Caramel)'
    | 'Alcremie (Berry Ruby Swirl)'
    | 'Alcremie (Berry Matcha)'
    | 'Alcremie (Berry Salted)'
    | 'Alcremie (Berry Lemon)'
    | 'Alcremie (Berry Mint)'
    | 'Alcremie (Berry Rainbow)'
    | 'Alcremie (Love Vanilla)'
    | 'Alcremie (Love Ruby Cream)'
    | 'Alcremie (Love Caramel)'
    | 'Alcremie (Love Ruby Swirl)'
    | 'Alcremie (Love Matcha)'
    | 'Alcremie (Love Salted)'
    | 'Alcremie (Love Lemon)'
    | 'Alcremie (Love Mint)'
    | 'Alcremie (Love Rainbow)'
    | 'Alcremie (Star Vanilla)'
    | 'Alcremie (Star Ruby Cream)'
    | 'Alcremie (Star Caramel)'
    | 'Alcremie (Star Ruby Swirl)'
    | 'Alcremie (Star Matcha)'
    | 'Alcremie (Star Salted)'
    | 'Alcremie (Star Lemon)'
    | 'Alcremie (Star Mint)'
    | 'Alcremie (Star Rainbow)'
    | 'Alcremie (Clover Vanilla)'
    | 'Alcremie (Clover Ruby Cream)'
    | 'Alcremie (Clover Caramel)'
    | 'Alcremie (Clover Ruby Swirl)'
    | 'Alcremie (Clover Matcha)'
    | 'Alcremie (Clover Salted)'
    | 'Alcremie (Clover Lemon)'
    | 'Alcremie (Clover Mint)'
    | 'Alcremie (Clover Rainbow)'
    | 'Alcremie (Flower Vanilla)'
    | 'Alcremie (Flower Ruby Cream)'
    | 'Alcremie (Flower Caramel)'
    | 'Alcremie (Flower Ruby Swirl)'
    | 'Alcremie (Flower Matcha)'
    | 'Alcremie (Flower Salted)'
    | 'Alcremie (Flower Lemon)'
    | 'Alcremie (Flower Mint)'
    | 'Alcremie (Flower Rainbow)'
    | 'Alcremie (Ribbon Vanilla)'
    | 'Alcremie (Ribbon Ruby Cream)'
    | 'Alcremie (Ribbon Caramel)'
    | 'Alcremie (Ribbon Ruby Swirl)'
    | 'Alcremie (Ribbon Matcha)'
    | 'Alcremie (Ribbon Salted)'
    | 'Alcremie (Ribbon Lemon)'
    | 'Alcremie (Ribbon Mint)'
    | 'Alcremie (Ribbon Rainbow)'
    | 'Gigantamax Alcremie'
    | 'Falinks'
    | 'Pincurchin'
    | 'Snom'
    | 'Frosmoth'
    | 'Stonjourner'
    | 'Eiscue (Ice Face)'
    | 'Eiscue (Noice Face)'
    | 'Indeedee (Male)'
    | 'Indeedee (Female)'
    | 'Morpeko'
    | 'Morpeko (Hangry)'
    | 'Cufant'
    | 'Copperajah'
    | 'Gigantamax Copperajah'
    | 'Dracozolt'
    | 'Arctozolt'
    | 'Dracovish'
    | 'Arctovish'
    | 'Duraludon'
    | 'Gigantamax Duraludon'
    | 'Dreepy'
    | 'Drakloak'
    | 'Dragapult'
    | 'Zacian (Battle Hero)'
    | 'Zacian (Crowned Sword)'
    | 'Zamazenta (Battle Hero)'
    | 'Zamazenta (Crowned Shield)'
    | 'Eternatus'
    | 'Eternamax Eternatus'
    | 'Kubfu'
    | 'Urshifu (Single Strike)'
    | 'Urshifu (Rapid Strike)'
    | 'Gigantamax Urshifu (Single Strike)'
    | 'Gigantamax Urshifu (Rapid Strike)'
    | 'Zarude'
    | 'Zarude (Dada)'
    | 'Regieleki'
    | 'Regidrago'
    | 'Glastrier'
    | 'Spectrier'
    | 'Calyrex'
    | 'Ice Rider Calyrex'
    | 'Shadow Rider Calyrex'
    | 'MissingNo.'
    | '???';
