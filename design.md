# Idle Fight - Game Design Document

## 1. Core Concept

**Idle Fight** is a classic idle/incremental game where players progressively grow stronger by defeating enemies, acquiring items, and leveling up spells and talents. The game emphasizes slow, satisfying progression with meaningful milestone moments.

## 2. Progression Philosophy

- **Very Slow Progression**: Players should feel progress over hours, not minutes
- **Exponential Scaling**: Enemy stats and rewards scale exponentially with world/wave progression
- **Multiple Progression Paths**: Spells, items, and talents all contribute to character growth
- **Automation**: Core combat should be mostly automatic with player input for optimization

## 3. Core Systems

### 3.1 Combat

- **Automatic Spell Casting**: Equipped spells auto-cast when cooldown expires
- **Attack Time**: Each spell has a base "Time" cost (cooldown in ticks)
- **Damage Formula**: Spell Damage = Base Damage + Character Attack Stat
- **Status Effects**: Fire, Ice, Lightning, Poison, Bleed - add on top of damage
- **Defense**: Reduces incoming damage (formula: damage \* (1 - defense_ratio))

### 3.2 Spells

Base Spells to Design:

- **Strike** (1000 base damage, 50 time) - Basic auto-attack, always equipped
- **Fireball** (15 damage, 100 time) - Entry-level spell with fire effect
- **Ice Bolt** (18 damage, 100 time) - Entry-level spell with ice effect
- **Lightning Strike** (22 damage, 100 time) - Entry-level spell with lightning effect
- **Meteor Shower** (40 damage, 100 time) - Mid-tier AoE fire spell
- **Arcane Burst** (35 damage, 100 time) - Mid-tier pure damage spell
- **Inferno** (60 damage, 100 time) - High-tier fire spell
- **Absolute Zero** (60 damage, 100 time) - High-tier ice spell
- **Apocalypse** (100 damage, 100 time) - Ultimate spell with mixed effects

**Spell Progression**:

- Early: Players get basic spells and slowly acquire stronger variants
- Mid: Spells unlock through progression milestones
- Late: Ultimate spells become available at high progression levels

### 3.3 Enemies

Enemy scaling:

- Level = (World - 1) \* 10 + Wave
- Base multiplier: 1.0x (normal), 1.5x (boss)
- Health, Attack, Defense all scale with level
- Boss waves every 10 waves (Wave 10, 20, 30, etc)

Example Progression:

- Waves 1-9: World 1, basic enemies
- Wave 10: World 1 Boss (1.5x stats)
- Waves 11-19: World 2, stronger enemies
- Wave 20: World 2 Boss
- etc.

### 3.4 Items

Item progression:

- Drop from enemies with rarity scaling
- Rarities: Common → Uncommon → Rare → Epic → Legendary
- Higher rarity = more secondary effects
- Effects: Flat/Percent bonuses to Attack, Defense, Health, Speed + Status Stats
- Item Drop Chance increases with equipment, creating a progression loop

### 3.5 Talents

Talent System:

- **Increased Attack**: +1 Attack per level (max 10)
- **Poison Strike**: +1 Poison per level (max 5)
- **Flame Strike**: +2 Fire per level (max 5)
- **Lightning Strike**: +3 Lightning per level (max 5)
- **Iron Skin**: +1 Defense per level (max 10)
- **Nimble Feet**: +1 Speed per level (max 5) - affects spell cooldowns

Gain 1 talent point per enemy defeated.

## 4. Balance Goals

### 4.1 Time to Kill

- Early game (Waves 1-3): 5-10 seconds per enemy
- Mid game (Waves 10-20): 15-30 seconds per enemy
- Late game (Waves 50+): 30+ seconds per enemy

### 4.2 Progression Milestones

- Milestone every 10 waves: New spell unlock or significant stat jump
- Meaningful power spikes from completing talent trees
- Item rarity gates: Can't get Epic items until certain world

### 4.3 Idle Playstyle

- 5-minute auto-save intervals
- Players should be able to leave game running for extended periods
- Prestige/reset mechanics (for future) to enable multiple progression cycles

## 5. Content Targets

### Current State

- ✅ Core systems implemented (combat, items, spells, talents)
- ✅ Save/load system
- ✅ 9 spells available
- ⚠️ Spell balancing needed
- ⚠️ Enemy progression curve needs tuning
- ⚠️ Item drop rates need adjustment

### Next Phase

1. **Balance Pass 1**: Tune spell damage, cooldowns, and effect values
2. **Enemy Tuning**: Adjust enemy health/damage scaling for pacing
3. **New Spells**: Add 10-15 more spells for long-term progression
4. **Boss Design**: Make boss waves feel special with unique mechanics
5. **Milestone Events**: Add unlock messages and progression feedback

## 6. Pacing Targets

**First Hour**:

- Complete Worlds 1-3 (~30 waves)
- Acquire basic items
- Start feeling progression in stats

**First Day**:

- Reach World 5-10 (~100 waves)
- Unlock mid-tier spells
- Have multiple equipment slots filled

**First Week**:

- Reach World 20+ (~200+ waves)
- Access most spells
- Talent trees feel meaningful
- Item rarity progression visible

**Long Term**:

- Exponential growth continues
- New systems unlock (prestige, challenges, etc.)
- Late game becomes about optimization

## 7. Future Features

- [ ] Prestige/Reset system for multiple cycles
- [ ] Challenge modes with modifiers
- [ ] Achievements/badges
- [ ] Daily quests
- [ ] Spell/talent combinations
- [ ] World map visualization
- [ ] Boss special abilities
- [ ] Resource multipliers (orbs, essence, etc.)
