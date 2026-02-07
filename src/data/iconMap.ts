import { LuSword } from "react-icons/lu";
import {
  GiZeusSword,
  GiLightningStorm,
  GiPoisonBottle,
  GiThorHammer,
  GiBroadsword,
  GiChestArmor,
  GiBoots,
  GiRing,
  GiGemNecklace,
  GiVisoredHelm,
  GiHornedHelm,
  GiSonicShoes,
  GiGoblinHead,
  GiSkeleton,
  GiSeatedMouse,
  GiSpiderAlt,
  GiSlime,
  GiEvilBat,
  GiShamblingZombie,
  GiOrcHead,
  GiLunarWand,
  GiDoubleDragon,
  GiBoneGnawer,
  GiCelebrationFire,
  GiColdHeart,
  GiDrakkarDragon,
  GiHoodedAssassin,
  GiLightningTree,
  GiPoisonGas,
  GiSharpedTeethSkull,
} from "react-icons/gi";
import { BsFire } from "react-icons/bs";
import { MdOutlineSevereCold } from "react-icons/md";
import { GiHeartPlus } from "react-icons/gi";
import { LuWand } from "react-icons/lu";
import { ImShield } from "react-icons/im";
import { MdShield } from "react-icons/md";
import { GiCheckedShield } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { GiWizardStaff } from "react-icons/gi";
import { FaHatWizard } from "react-icons/fa";
import { FaSkull } from "react-icons/fa";
import { RiKnifeBloodLine } from "react-icons/ri";
import { GiScreaming } from "react-icons/gi";
import { GiBloodySword } from "react-icons/gi";
import { GiWindSlap } from "react-icons/gi";
import { SiFireship } from "react-icons/si";
import { FaMeteor } from "react-icons/fa";
import { GiFrostfire } from "react-icons/gi";
import { GiBoltSpellCast } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";
import { GiArmoredPants } from "react-icons/gi";

export const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: string | number; color?: string }>
> = {
  pants: GiArmoredPants,
  bolt: MdElectricBolt,
  handSpell: GiBoltSpellCast,
  frostFire: GiFrostfire,
  meteor: FaMeteor,
  fire2: SiFireship,
  wind: GiWindSlap,
  bloodSword: GiBloodySword,
  shout: GiScreaming,
  bloodKnife: RiKnifeBloodLine,
  skull: FaSkull,
  wizardHat: FaHatWizard,
  staff: GiWizardStaff,
  book: FaBook,
  checkedSield: GiCheckedShield,
  shield: MdShield,
  bigShield: ImShield,
  wand: LuWand,
  sword: LuSword,
  zeusSword: GiZeusSword,
  fire: BsFire,
  ice: MdOutlineSevereCold,
  lightning: GiLightningStorm,
  poison: GiPoisonBottle,
  hammer: GiThorHammer,
  heal: GiHeartPlus,
  broadsword: GiBroadsword,
  chestArmor: GiChestArmor,
  boots: GiBoots,
  ring: GiRing,
  legArmor: GiArmoredPants,
  gemNecklace: GiGemNecklace,
  visoredHelm: GiVisoredHelm,
  hornedHelm: GiHornedHelm,
  sonicShoes: GiSonicShoes,
  goblinHead: GiGoblinHead,
  skeleton: GiSkeleton,
  seatedMouse: GiSeatedMouse,
  spiderAlt: GiSpiderAlt,
  slime: GiSlime,
  evilBat: GiEvilBat,
  shamblingZombie: GiShamblingZombie,
  orcHead: GiOrcHead,
  lunarWand: GiLunarWand,
  doubleDragon: GiDoubleDragon,
  boneGnawer: GiBoneGnawer,
  celebrationFire: GiCelebrationFire,
  coldHeart: GiColdHeart,
  drakkarDragon: GiDrakkarDragon,
  hoodedAssassin: GiHoodedAssassin,
  lightningTree: GiLightningTree,
  poisonGas: GiPoisonGas,
  sharpedTeethSkull: GiSharpedTeethSkull,
};
